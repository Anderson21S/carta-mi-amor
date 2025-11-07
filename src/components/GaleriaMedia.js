import React, { useState, useEffect } from 'react';
import './GaleriaMedia.css';

// Importa tus imágenes locales
import recuerdo1 from '../assets/images/recuerdo1.jpg';
import recuerdo2 from '../assets/images/recuerdo2.jpg';
import recuerdo3 from '../assets/images/recuerdo3.jpg';
import recuerdo4 from '../assets/images/recuerdo4.jpg';
import recuerdo5 from '../assets/images/recuerdo5.jpg';
//import recuerdo6 from '../assets/images/recuerdo6.jpg';
import pareja from '../assets/images/pareja.jpg';
import video1 from '../assets/videos/video1.mp4';
import video2 from '../assets/videos/video2.mp4';

const GaleriaMedia = () => {
  const [media, setMedia] = useState([
    {
      id: 1,
      tipo: 'foto',
      url: recuerdo1,
      nombre: 'Nuestra primera cita',
      fecha: '20/12/2024',
      descripcion: 'Este dia es muy especial, recuerdo con mucho cariño los besos helados, la calidez de tenerte cerca de mi.'
    },
    {
      id: 2,
      tipo: 'foto', 
      url: recuerdo2,
      nombre: 'Simplemente juntos',
      fecha: '<3',
      descripcion: 'Momentos que solo con tener a mi abrazada, me alegran el corazon'
    },
    {
      id: 3,
      tipo: 'foto',
      url: pareja,
      nombre: 'Mi amor bello',
      fecha: '24/10/2025',
      descripcion: 'Eres mi todo, mi complemento mas bonito'
    },
    {
      id: 4,
      tipo: 'video',
      url: video1,
      nombre: 'Mi hogar siempre tu ❤️',
      fecha: '03/10/2025',
      descripcion: 'Cada segundo contigo es un tesoro'
    },
    {
      id: 5,
      tipo: 'video',
      url: video2, // Cambia por tu nueva imagen
      nombre: 'Me encanta comer contigoo',
      fecha: '27/10/2025',
      descripcion: 'Cada comida junto a tu lado, tu compañia hace que todo sepa y sea mas delicioso'
    },
    {
      id: 6,
      tipo: 'foto',
      url: recuerdo4, // Cambia por tu nueva imagen
      nombre: 'Tu Día Especial',
      fecha: '09/06/2025',
      descripcion: 'En este día especial tu sonrisa brillaba, me llena mucho el corazón verte sonreir, sentir tu conrazón cerca del mio es indescriptible, solo quiero estar a tu lado en cada momento empecial para ti'
    },
    {
      id: 7,
      tipo: 'foto',
      url: recuerdo5, // Cambia por tu nueva imagen
      nombre: '<3',
      fecha: '30/07/2025',
      descripcion: 'Cada puesta de sol es más bella a tu lado'
    },
    {
      id: 8,
      tipo: 'foto',
      url: recuerdo3, // Cambia por tu nueva imagen
      nombre: 'Nosotros pequeños 💗',
      fecha: '13/09/2025',
      descripcion: 'Donde recreamos lindos recuerdos juntos'
    }
    
  ]);

  const [cartaAbierta, setCartaAbierta] = useState(false);
  const [mediaSeleccionado, setMediaSeleccionado] = useState(null);

  // Efecto para movimiento aleatorio de las polaroids
  useEffect(() => {
    const interval = setInterval(() => {
      setMedia(prev => prev.map(item => ({
        ...item,
        movimiento: Math.random() * 6 - 3,
        elevacion: Math.random() * 10 + 5
      })));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const nuevosMedia = files.map(file => ({
      id: Date.now() + Math.random(),
      tipo: file.type.startsWith('video/') ? 'video' : 'foto',
      url: URL.createObjectURL(file),
      nombre: file.name.replace(/\.[^/.]+$/, ""),
      fecha: new Date().toLocaleDateString(),
      descripcion: 'Nuevo recuerdo agregado',
      movimiento: Math.random() * 6 - 3,
      elevacion: Math.random() * 10 + 5
    }));
    
    setMedia(prev => [...nuevosMedia, ...prev]);
    event.target.value = '';
  };

  const eliminarMedia = (id) => {
    setMedia(prev => prev.filter(item => item.id !== id));
  };

  const abrirModal = (item) => {
    setMediaSeleccionado(item);
  };

  const cerrarModal = () => {
    setMediaSeleccionado(null);
  };

  return (
    <div className="polaroid-container">
      {/* Fondo romántico */}
      <div className="fondo-romantico">
        <div className="corazon-flotante">💗</div>
        <div className="corazon-flotante">💗</div>
        <div className="corazon-flotante">💗</div>
        <div className="corazon-flotante">💗</div>
        <div className="corazon-flotante">💗</div>
        <div className="corazon-flotante">💗</div>
        <div className="corazon-flotante">💗</div>
        <div className="corazon-flotante">💗</div>
        <div className="corazon-flotante">💖</div>
        <div className="corazon-flotante">💕</div>
        <div className="corazon-flotante">💝</div>
        <div className="corazon-flotante">💗</div>
        <div className="corazon-flotante">💖</div>
        <div className="corazon-flotante">💕</div>
        <div className="corazon-flotante">💝</div>
        <div className="corazon-flotante">💗</div>
        <div className="corazon-flotante">💖</div>
        <div className="corazon-flotante">💕</div>
      </div>

      {/* Galería Polaroid */}
      <div className="polaroid-gallery">
        {/* Imágenes en estilo polaroid */}
        <div className="polaroid-grid">
          {media.map((item, index) => (
            <div 
              key={item.id}
              className={`polaroid-item ${item.tipo} polaroid-${(index % 8) + 1}`}
              style={{ 
                transform: `rotate(${item.movimiento || 0}deg) translateY(-${item.elevacion || 0}px)`,
                zIndex: media.length - index,
                animationDelay: `${index * 0.2}s`
              }}
              onClick={() => abrirModal(item)}
            >
              <div className="polaroid-frame">
                {item.tipo === 'foto' ? (
                  <img 
                    src={item.url} 
                    alt={item.nombre}
                    className="polaroid-image"
                  />
                ) : (
                  <div className="polaroid-video-container">
                    <video className="polaroid-video">
                      <source src={item.url} type="video/mp4" />
                    </video>
                    <div className="video-play-icon">▶</div>
                  </div>
                )}
                
                <div className="polaroid-caption">
                  <span className="polaroid-title">{item.nombre}</span>
                  <span className="polaroid-date">{item.fecha}</span>
                </div>
              </div>
              
              <div className="polaroid-overlay">
                <button 
                  className="polaroid-delete-btn"
                 
                >
                  💗
                </button>
                <span className="polaroid-desc">{item.descripcion}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Carta en el centro */}
        <div className="polaroid-center-card" onClick={() => setCartaAbierta(true)}>
          <div className="polaroid-letter">
            <div className="letter-icon">💌</div>
            <div className="letter-text">
              <h3>Para el Amor de mi Vida</h3>
              <p>Abrela amor</p>
            </div>
          </div>
        </div>
      </div>

      

      {/* Modal para vista ampliada */}
      {mediaSeleccionado && (
        <div className="polaroid-modal-overlay" onClick={cerrarModal}>
          <div className="polaroid-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="polaroid-modal-close" onClick={cerrarModal}>×</button>
            <div className="polaroid-modal-frame">
              {mediaSeleccionado.tipo === 'foto' ? (
                <img src={mediaSeleccionado.url} alt={mediaSeleccionado.nombre} />
              ) : (
                <video controls autoPlay>
                  <source src={mediaSeleccionado.url} type="video/mp4" />
                </video>
              )}
            </div>
            <div className="polaroid-modal-info">
              <h3>{mediaSeleccionado.nombre}</h3>
              <p className="modal-date">{mediaSeleccionado.fecha}</p>
              <p className="modal-desc">{mediaSeleccionado.descripcion}</p>
            </div>
          </div>
        </div>
      )}

      {/* Carta Expandida */}
      {cartaAbierta && (
        <div className="polaroid-letter-overlay" onClick={() => setCartaAbierta(false)}>
          <div className="polaroid-letter-expanded" onClick={(e) => e.stopPropagation()}>
            <button 
              className="letter-close-btn"
              onClick={() => setCartaAbierta(false)}
            >
              ×
            </button>
            
            <div className="letter-content">
              <h2>Para Mi Estefi 💖</h2>
              
              <div className="letter-message">
                <p>
                  Cada uno de estos momentos cuenta una parte de nuestra historia... 
                  esa historia que comenzó hace exactamente un año y que sigue escribiéndose 
                  con cada sonrisa, cada mirada, cada momento a tu lado.
                </p>
                
                <p>
                  En cada foto veo no solo un recuerdo, sino un pedacito de la felicidad 
                  que me das cada día. En cada video escucho no solo risas, sino la música 
                  más hermosa que mis oídos puedan escuchar.
                </p>
                
                <p>
                  Este collage es más que imágenes... es el mapa de nuestro amor, 
                  es la prueba de que los mejores momentos de mi vida son aquellos 
                  que paso contigo.
                </p>
                
                <p className="firma">
                  Con todo mi amor,<br/>
                  <strong>Steven</strong>
                </p>
              </div>

              <div className="love-stats">
                <div className="stat-item">
                  <span className="stat-number">365</span>
                  <span className="stat-label">días juntos</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">∞</span>
                  <span className="stat-label">sonrisas</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">1</span>
                  <span className="stat-label">amor eterno</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GaleriaMedia;