import './Dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard-page">

            <h1>Dashboard</h1>

            <p>
                Bienvenido al Sistema de Mapeo Organizacional e Inventario.
            </p>

            <div className="dashboard-cards">

                <div className="dashboard-card">
                    <h2>Procesos</h2>
                    <p>Gestionar los procesos de la organización.</p>
                </div>

                <div className="dashboard-card">
                    <h2>Inventario</h2>
                    <p>Consultar y administrar el inventario.</p>
                </div>

                <div className="dashboard-card">
                    <h2>Usuarios</h2>
                    <p>Administrar los usuarios del sistema.</p>
                </div>

                <div className="dashboard-card">
                    <h2>Reportes</h2>
                    <p>Consultar los reportes del sistema.</p>
                </div>

            </div>

        </div>
    );
}

export default Dashboard;