import React from 'react';
import '@/ui/assets/css/main.css';
import SignInButton from '@/ui/auth/SignIn';

function Landing() {
  return (
    <html>
      <head>
        <title>Welcome to Smartbites</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      </head>
      <body className="is-preload">

        <div id="wrapper">

          <section id="banner" className="major">
            <div className="inner">
              <header className="major">
                <h1>¡Únete al equipo de Smartbites!</h1>
              </header>
              <div className="content">
                <p>¿Estás listo para transformar tu estilo de vida y alcanzar tus objetivos de salud y
                  bienestar? En Smartbites, hemos creado la herramienta definitiva para hacer que tu viaje hacia
                  una vida más saludable sea simple, deliciosa y exitosa.
                </p>
                <SignInButton />
              </div>
            </div>
          </section>


          <div id="main">
            <section id="one" className="tiles">
              <article>
                <span className="image">
                  <img src="/images/pic01.jpg" alt="" />
                </span>
                <header className="major">
                  <h3><a href="landing.html" className="link">Dietas Personalizadas</a></h3>
                  <p>Olvídate de las dietas genéricas. Nosotros te creamos planes nutricionales adaptados a tus
                    necesidades individuales.
                  </p>
                </header>
              </article>
              <article>
                <span className="image">
                  <img src="/images/pic02.jpg" alt="" />
                </span>
                <header className="major">
                  <h3><a href="landing.html" className="link">Recetas Deliciosas y Nutritivas</a></h3>
                  <p>Te proporcionamos recetas equilibradas y deliciosas, diseñadas para satisfacer tu paladar y
                    cumplir con tus requerimientos nutricionales.
                  </p>
                </header>
              </article>
              <article>
                <span className="image">
                  <img src="/images/pic03.jpg" alt="" />
                </span>
                <header className="major">
                  <h3><a href="landing.html" className="link">Planificación Simplificada</a></h3>
                  <p>No más estrés por decidir qué comer cada día. Nuestro creador de dietas te proporciona un plan semanal detallado.</p>
                </header>
              </article>
              <article>
                <span className="image">
                  <img src="/images/pic04.jpg" alt="" />
                </span>
                <header className="major">
                  <h3><a href="landing.html" className="link">Personalización Total</a></h3>
                  <p> Nos tomamos en serio tu bienestar. Cada dieta que creamos es única, adaptándose a ti y a tus metas.</p>
                </header>
              </article>
              <article>
                <span className="image">
                  <img src="/images/pic05.jpg" alt="" />
                </span>
                <header className="major">
                  <h3><a href="landing.html" className="link">Facilidad y Comodidad</a></h3>
                  <p>Simplificamos la planificación de comidas para que puedas
                    concentrarte en disfrutar de la vida. Sin complicaciones, sin estrés.
                  </p>
                </header>
              </article>
              <article>
                <span className="image">
                  <img src="/images/pic06.jpg" alt="" />
                </span>
                <header className="major">
                  <h3><a href="#" className="link">Resultados Demostrados</a></h3>
                  <p>Nuestros usuarios han experimentado transformaciones reales en sus vidas.
                    Únete a nuestra comunidad y comienza tu viaje hoy mismo.
                  </p>
                </header>
              </article>
            </section>

            <section id="two">
              <div className="inner">
                <header className="major">
                  <h2>Completa tu Perfil</h2>
                </header>
                <p>Responde algunas preguntas sobre tus objetivos, preferencias alimenticias
                  y restricciones. Cuanta más información nos des, mejor podremos personalizar tu plan.</p>
                <SignInButton />
              </div>
            </section>

          </div>

          <section id="contact">
            <div className="inner">
              <section className="split">
                <section>
                  <div className="contact-method">
                    <span className="icon solid alt fa-envelope"></span>
                    <h3>Email</h3>
                    <a className="email" href="mailto:smartbites@gmail.com?," > smartbites@gmail.com </a>
                  </div>
                </section>
                <section>
                  <div className="contact-method">
                    <span className="icon solid alt fa-phone"></span>
                    <h3>Teléfono</h3>
                    <a href="tel:+34876503982">+34 876 50 39 82</a>
                  </div>
                </section>
                <section>
                  <div className="contact-method">
                    <span className="icon solid alt fa-home"></span>
                    <h3>Dirección</h3>
                    <a href='geo:41.668963,-0.888946?'>World Trade Center Zaragoza 15th floor<br />
                      Zaragoza, 50005<br />
                      España</a>
                  </div>
                </section>
              </section>
            </div>
          </section>

          <footer id="footer">
            <div className="inner">
              <ul className="icons">
                <li><a href="#" className="icon brands alt fa-twitter"><span className="label">Twitter</span></a></li>
                <li><a href="#" className="icon brands alt fa-facebook-f"><span className="label">Facebook</span></a></li>
                <li><a href="#" className="icon brands alt fa-instagram"><span className="label">Instagram</span></a></li>
                <li><a href="#" className="icon brands alt fa-github"><span className="label">GitHub</span></a></li>
                <li><a href="#" className="icon brands alt fa-linkedin-in"><span className="label">LinkedIn</span></a></li>
              </ul>
              <ul className="copyright">
                <li>&copy; Untitled</li><li>Design: <a >Smartbites</a></li>
              </ul>
            </div>
          </footer>

        </div>
      </body>
    </html>
  )
}

export default Landing;