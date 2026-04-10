const { useState } = React;

function App() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // NOTA: Para producción REAL, se recomienda tener un endpoint backend que envíe el email,
  // pero para demo se puede probar con EmailJS o similar desde frontend.
  // Aquí queda simulada la petición, debes adaptarla a tu método real de envío.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setError('');
    // EJEMPLO: simula envío de formulario
    try {
      // Aquí deberías llamar a tu servicio backend, ejemplo:
      // await fetch('/api/send-email', {method: 'POST', body: JSON.stringify(form)});
      await new Promise(resolve => setTimeout(resolve, 1500));
      setEnviado(true);
      setForm({
        nombre: '',
        email: '',
        mensaje: ''
      });
    } catch (err) {
      setError('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
    }
    setEnviando(false);
  };

  return (
    <div style={{fontFamily: 'Arial, sans-serif', maxWidth: 600, margin: '0 auto', padding: 24}}>
      <header style={{background: '#4caf50', color: 'white', padding: 24, borderRadius: 8, marginBottom: 32, textAlign: 'center'}}>
        <h1 style={{margin: 0}}>TuLocalGranada</h1>
        <p>El sitio donde vender tu local en Granada</p>
      </header>
      
      <section style={{marginBottom: 40}}>
        <h2>¿Quiénes somos?</h2>
        <p>
          Bienvenido a <b>TuLocalGranada</b>. Somos una plataforma dedicada a comprar en la ciudad de Granada.<br />
          Si tienes un local, rellena el formulario de contacto y te contactaremos.
        </p>
      </section>

      <section>
        <h2>Contacto</h2>
        <p>¿Tienes preguntas, sugerencias o deseas publicar tu local? Rellena el formulario y nos pondremos en contacto contigo.</p>
        {enviado ? (
          <div style={{color: 'green', marginTop: 24}}>¡Mensaje enviado correctamente! Te responderemos pronto.</div>
        ) : (
          <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: 16, marginTop: 8}}>
            <input
              type="text"
              name="nombre"
              placeholder="Tu nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              style={{padding: 8, borderRadius: 4, border: '1px solid #ccc'}}
            />
            <input
              type="email"
              name="email"
              placeholder="Tu correo electrónico"
              value={form.email}
              onChange={handleChange}
              required
              style={{padding: 8, borderRadius: 4, border: '1px solid #ccc'}}
            />
            <textarea
              name="mensaje"
              placeholder="Escribe tu mensaje aquí..."
              value={form.mensaje}
              onChange={handleChange}
              required
              rows={4}
              style={{padding: 8, borderRadius: 4, border: '1px solid #ccc'}}
            />
            <button type="submit" disabled={enviando} style={{padding: 10, borderRadius: 4, background: '#4caf50', color: 'white', border: 'none', fontWeight: 'bold'}}>
              {enviando ? 'Enviando...' : 'Enviar'}
            </button>
            {error && <div style={{color: 'red'}}>{error}</div>}
          </form>
        )}
      </section>
    </div>
  );
}

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);