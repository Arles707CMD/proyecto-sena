import './Login.css';

function Login() {
    return (
        <div className="login-page">
            <div className="login-container">

                <div className="login-header">
                    <h1>Sistema de Gestión</h1>
                    <p>Mapeo Organizacional e Inventario</p>
                </div>

                <form className="login-form">

                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Ingrese su correo"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Ingrese su contraseña"
                        />
                    </div>

                    <button type="submit" className="login-button">
                        Iniciar sesión
                    </button>

                </form>

                <div className="login-footer">
                    <a href="#">¿Olvidó su contraseña?</a>
                </div>

            </div>
        </div>
    );
}

export default Login;