import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import * as tus from 'tus-js-client';
import { supabase, supabaseAnonKey, supabaseUrl } from '../lib/supabase';

const createVideoPoster = (file) => new Promise((resolve, reject) => {
  const video = document.createElement('video');
  const videoUrl = URL.createObjectURL(file);
  let settled = false;
  let timeoutId;

  const finish = (error, poster) => {
    if (settled) return;
    settled = true;
    window.clearTimeout(timeoutId);
    video.pause();
    video.removeAttribute('src');
    video.load();
    URL.revokeObjectURL(videoUrl);
    if (error) reject(error);
    else resolve(poster);
  };
  const fail = () => finish(new Error(
    'Could not create a video preview from this file. Try another MP4, WebM, or MOV file.'
  ));
  const captureFrame = () => {
    if (!video.videoWidth || !video.videoHeight) {
      fail();
      return;
    }

    const canvas = document.createElement('canvas');
    const scale = Math.min(1, 1280 / video.videoWidth, 720 / video.videoHeight);
    canvas.width = Math.round(video.videoWidth * scale);
    canvas.height = Math.round(video.videoHeight * scale);
    const context = canvas.getContext('2d');
    if (!context) {
      fail();
      return;
    }

    try {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
    } catch {
      fail();
      return;
    }
    canvas.toBlob((poster) => {
      if (!poster) fail();
      else finish(null, poster);
    }, 'image/jpeg', 0.85);
  };

  video.muted = true;
  video.playsInline = true;
  video.preload = 'auto';
  video.addEventListener('loadedmetadata', () => {
    const targetTime = Number.isFinite(video.duration) && video.duration > 0
      ? Math.min(1, video.duration / 2)
      : 0;
    if (targetTime > 0.05) {
      video.addEventListener('seeked', captureFrame, { once: true });
      video.currentTime = targetTime;
    } else {
      video.addEventListener('loadeddata', captureFrame, { once: true });
    }
  }, { once: true });
  video.addEventListener('error', fail, { once: true });
  timeoutId = window.setTimeout(fail, 15000);
  video.src = videoUrl;
  video.load();
});

const DashboardSectionIcon = ({ section }) => {
  const iconPaths = {
    quotes: (
      <>
        <path d="M6 3.75h8l4.25 4.5v12A1.75 1.75 0 0 1 16.5 22h-10A1.75 1.75 0 0 1 4.75 20.25V5.5A1.75 1.75 0 0 1 6.5 3.75Z" />
        <path d="M14 4v4.5h4.25M8 12h8M8 16h8" />
      </>
    ),
    'contact-messages': (
      <>
        <rect x="3.5" y="5" width="17" height="14" rx="2" />
        <path d="m4.5 7 7.5 6 7.5-6" />
      </>
    ),
    gallery: (
      <>
        <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
        <circle cx="9" cy="9.5" r="1.5" />
        <path d="m4.5 17 5-5 3.5 3 2.5-2 4.5 4" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[section]}
    </svg>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { section } = useParams();
  const [quotes, setQuotes] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryError, setGalleryError] = useState('');
  const [galleryMessage, setGalleryMessage] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const loadDashboard = async () => {
      if (!supabase) {
        setError('Supabase admin authentication is not configured.');
        setLoading(false);
        return;
      }

      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      const session = sessionData.session;

      if (sessionError || !session) {
        navigate('/admin', { replace: true });
        return;
      }

      const role = session.user.app_metadata?.role;
      if (role !== 'admin') {
        await supabase.auth.signOut();
        navigate('/admin', { replace: true });
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        };
        const [quotesResult, contactsResult] = await Promise.all([
          axios.get('/api/quotes', config),
          axios.get('/api/contact', config),
        ]);

        if (active) {
          setQuotes(quotesResult.data);
          setContactMessages(contactsResult.data);
        }

        const { data: galleryData, error: galleryLoadError } = await supabase
          .from('gallery_images')
          .select('id, title, description, image_url, category, storage_path, media_type, poster_url, created_at')
          .order('created_at', { ascending: false });

        if (active) {
          if (galleryLoadError) {
            setGalleryError('Could not load gallery entries. Run the gallery storage SQL setup and try again.');
          } else {
            setGalleryImages(galleryData || []);
          }
        }
      } catch (requestError) {
        if (requestError.response?.status === 401 ||
            requestError.response?.status === 403) {
          await supabase.auth.signOut();
          navigate('/admin', { replace: true });
          return;
        }
        if (active) {
          setError(
            requestError.response?.data?.error ||
            'Unable to load administrator submissions.'
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadDashboard();
    return () => {
      active = false;
    };
  }, [navigate]);

  const handleGalleryUpload = async (event) => {
    event.preventDefault();
    setGalleryError('');
    setGalleryMessage('');

    if (!supabase) {
      setGalleryError('Supabase is not configured.');
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const file = formData.get('image');
    const title = String(formData.get('title') || '').trim();
    const description = String(formData.get('description') || '').trim();
    const category = String(formData.get('category') || '').trim();
    const extensions = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
      'video/mp4': 'mp4',
      'video/webm': 'webm',
      'video/quicktime': 'mov',
    };
    const mediaType = file instanceof File && file.type.startsWith('video/')
      ? 'video'
      : 'image';

    if (!(file instanceof File) || !extensions[file.type]) {
      setGalleryError('Choose a JPG, PNG, WebP, MP4, WebM, or MOV file.');
      return;
    }
    const maxFileSize = mediaType === 'video'
      ? 100 * 1024 * 1024
      : 8 * 1024 * 1024;
    if (file.size > maxFileSize) {
      setGalleryError(
        mediaType === 'video'
          ? 'Choose a video that is 100 MB or smaller.'
          : 'Choose an image that is 8 MB or smaller.'
      );
      return;
    }
    if (!title || title.length > 120 || description.length > 500) {
      setGalleryError('Add a title up to 120 characters and a description up to 500 characters.');
      return;
    }
    if (!['residential', 'landscaping', 'commercial'].includes(category)) {
      setGalleryError('Choose a valid gallery category.');
      return;
    }

    const storagePath = `${category}/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${extensions[file.type]}`;
    const posterPath = mediaType === 'video' ? `${storagePath}.poster.jpg` : null;
    const uploadedPaths = [];

    setUploadingImage(true);
    setUploadProgress(0);
    try {
      if (mediaType === 'video') {
        const posterFile = await createVideoPoster(file);
        const { error: posterUploadError } = await supabase.storage
          .from('gallery')
          .upload(posterPath, posterFile, {
            cacheControl: '3600',
            contentType: 'image/jpeg',
            upsert: false,
          });
        if (posterUploadError) throw posterUploadError;
        uploadedPaths.push(posterPath);

        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();
        const accessToken = sessionData.session?.access_token;
        if (sessionError || !accessToken || !supabaseUrl || !supabaseAnonKey) {
          throw new Error('Your admin session expired. Sign in again and retry the upload.');
        }

        await new Promise((resolve, reject) => {
          const upload = new tus.Upload(file, {
            endpoint: `${supabaseUrl}/storage/v1/upload/resumable`,
            retryDelays: [0, 3000, 5000, 10000, 20000],
            chunkSize: 6 * 1024 * 1024,
            headers: {
              authorization: `Bearer ${accessToken}`,
              apikey: supabaseAnonKey,
            },
            metadata: {
              bucketName: 'gallery',
              objectName: storagePath,
              contentType: file.type,
              cacheControl: '3600',
            },
            uploadDataDuringCreation: true,
            removeFingerprintOnSuccess: true,
            onError: reject,
            onProgress: (bytesUploaded, bytesTotal) => {
              setUploadProgress(Math.round((bytesUploaded / bytesTotal) * 100));
            },
            onSuccess: resolve,
          });
          upload.start();
        });
        uploadedPaths.push(storagePath);
      } else {
        const { error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(storagePath, file, {
            cacheControl: '3600',
            contentType: file.type,
            upsert: false,
          });
        if (uploadError) throw uploadError;
        uploadedPaths.push(storagePath);
      }

      const { data: publicUrlData } = supabase.storage
        .from('gallery')
        .getPublicUrl(storagePath);
      const { data: posterUrlData } = posterPath
        ? supabase.storage.from('gallery').getPublicUrl(posterPath)
        : { data: null };

      const { data: imageRecord, error: insertError } = await supabase
        .from('gallery_images')
        .insert({
          title,
          description,
          category,
          image_url: publicUrlData.publicUrl,
          storage_path: storagePath,
          media_type: mediaType,
          poster_url: posterUrlData?.publicUrl || null,
        })
        .select('id, title, description, image_url, category, storage_path, media_type, poster_url, created_at')
        .single();

      if (insertError) throw insertError;

      setGalleryImages((current) => [imageRecord, ...current]);
      setGalleryMessage(`${mediaType === 'video' ? 'Video' : 'Image'} uploaded and added to the public gallery.`);
      form.reset();
    } catch (uploadError) {
      if (uploadedPaths.length) {
        const { error: cleanupError } = await supabase.storage
          .from('gallery')
          .remove(uploadedPaths);
        if (cleanupError) {
          console.error('Could not remove unreferenced gallery files:', cleanupError);
        }
      }
      console.error('Gallery image upload failed:', uploadError);
      setGalleryError(uploadError.message || 'Gallery upload failed. Check Storage setup and try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    navigate('/admin', { replace: true });
  };

  const dashboardSections = [
    {
      id: 'quotes',
      title: 'Quote Requests',
      count: quotes.length,
      description: 'Review customer quote requests.',
    },
    {
      id: 'contact-messages',
      title: 'Contact Messages',
      count: contactMessages.length,
      description: 'Read messages sent through the contact form.',
    },
    {
      id: 'gallery',
      title: 'Gallery Media',
      count: galleryImages.length,
      description: 'Upload and manage photos and videos in the website gallery.',
    },
  ];

  if (loading) {
    return <main className="admin-dashboard"><p>Loading submissions...</p></main>;
  }

  if (section && !dashboardSections.some((item) => item.id === section)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <main className="admin-dashboard">
      <header className="admin-dashboard-header">
        <div>
          <p className="admin-kicker">Up-Down-Lighting</p>
          <h1>Administrator Dashboard</h1>
        </div>
        <button className="btn btn-secondary" type="button" onClick={handleLogout}>
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 17l5-5-5-5M15 12H3" />
            <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
          </svg>
          Sign Out
        </button>
      </header>

      <nav className="admin-dashboard-nav" aria-label="Dashboard sections">
        <Link to="/admin/dashboard" aria-current={!section ? 'page' : undefined}>
          Overview
        </Link>
        {dashboardSections.map((item) => (
          <Link
            key={item.id}
            to={`/admin/dashboard/${item.id}`}
            aria-current={section === item.id ? 'page' : undefined}
          >
            {item.title}
            <span>{item.count}</span>
          </Link>
        ))}
      </nav>

      {error && <div className="admin-error" role="alert">{error}</div>}

      {!section && (
        <div className="admin-dashboard-overview">
          {dashboardSections.map((item) => (
            <Link
              className="admin-dashboard-card"
              key={item.id}
              to={`/admin/dashboard/${item.id}`}
            >
              <div className="admin-dashboard-card-top">
                <span className="admin-dashboard-card-count">{item.count}</span>
                <span className="admin-dashboard-card-icon">
                  <DashboardSectionIcon section={item.id} />
                </span>
              </div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <div className="admin-dashboard-card-action">
                <span>Open section</span>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}

      {section === 'quotes' && <section className="admin-section">
        <h2>Quote Requests ({quotes.length})</h2>
        {quotes.length === 0 ? (
          <p>No quote requests.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Service</th>
                  <th>Address</th>
                  <th>Received</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote) => (
                  <tr key={quote.id}>
                    <td>{quote.full_name}</td>
                    <td>{quote.email_address}</td>
                    <td>{quote.phone_number}</td>
                    <td>{quote.service_type}</td>
                    <td>{quote.property_address}</td>
                    <td>{quote.created_at ? new Date(quote.created_at).toLocaleString() : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>}

      {section === 'contact-messages' && <section className="admin-section">
        <h2>Contact Messages ({contactMessages.length})</h2>
        {contactMessages.length === 0 ? (
          <p>No contact messages.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Received</th>
                </tr>
              </thead>
              <tbody>
                {contactMessages.map((message) => (
                  <tr key={message.id}>
                    <td>{message.name}</td>
                    <td>{message.email}</td>
                    <td>{message.subject || ''}</td>
                    <td>{message.message}</td>
                    <td>{message.created_at ? new Date(message.created_at).toLocaleString() : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>}

      {section === 'gallery' && <section className="admin-section admin-gallery-section">
        <h2>Gallery Media ({galleryImages.length})</h2>
        <p>Upload photos or videos to Supabase Storage and publish them to the website gallery.</p>

        {galleryError && <div className="admin-error" role="alert">{galleryError}</div>}
        {galleryMessage && <div className="admin-success" role="status">{galleryMessage}</div>}

        <form className="admin-gallery-form" onSubmit={handleGalleryUpload}>
          <label className="form-label" htmlFor="gallery-image-title">Media title</label>
          <input
            id="gallery-image-title"
            className="form-input"
            name="title"
            maxLength={120}
            required
          />

          <label className="form-label" htmlFor="gallery-image-description">Media description</label>
          <textarea
            id="gallery-image-description"
            className="form-textarea"
            name="description"
            maxLength={500}
          />

          <label className="form-label" htmlFor="gallery-image-category">Category</label>
          <select id="gallery-image-category" className="form-select" name="category" required>
            <option value="">Choose a category</option>
            <option value="residential">Residential</option>
            <option value="landscaping">Landscaping</option>
            <option value="commercial">Commercial</option>
          </select>

          <label className="form-label" htmlFor="gallery-image-file">
            Photo or video (JPG, PNG, WebP up to 8 MB; MP4, WebM, MOV up to 100 MB)
          </label>
          <input
            id="gallery-image-file"
            className="form-input admin-file-input"
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime"
            required
          />

          {uploadingImage && (
            <div className="admin-upload-progress" role="status">
              <span>{uploadProgress ? `Uploading ${uploadProgress}%` : 'Preparing upload...'}</span>
              <progress max="100" value={uploadProgress} />
            </div>
          )}

          <button className="btn btn-primary" type="submit" disabled={uploadingImage}>
            {uploadingImage ? 'Uploading...' : 'Upload to Gallery'}
          </button>
        </form>

        {galleryImages.length > 0 && (
          <div className="admin-gallery-grid">
            {galleryImages.map((image) => (
              <article className="admin-gallery-card" key={image.id}>
                {image.media_type === 'video' ? (
                  <video
                    src={image.image_url}
                    poster={image.poster_url || undefined}
                    controls
                    preload="metadata"
                    playsInline
                  />
                ) : (
                  <img src={image.image_url} alt={image.title} loading="lazy" />
                )}
                <div>
                  <strong>{image.title}</strong>
                  <span>{image.category}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>}
    </main>
  );
};

export default AdminDashboard;
