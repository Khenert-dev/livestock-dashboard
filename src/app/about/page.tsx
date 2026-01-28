export default function AboutPage() {
  return (
    <main className="container py-4">
      <h1 className="fw-bold text-success mb-3">About FarmCare</h1>

      <p className="fs-5 text-muted">
        FarmCare is a prototype livestock monitoring dashboard designed
        to support real-time and historical awareness of animal movement
        in agricultural environments.
      </p>

      <h5 className="mt-4">Target Users</h5>
      <ul>
        <li>Farm operators and supervisors</li>
        <li>Non-technical users</li>
        <li>Desktop-first, mobile-supported environments</li>
      </ul>

      <h5 className="mt-3">System Capabilities</h5>
      <ul>
        <li>Live livestock movement visualization</li>
        <li>Historical activity analysis</li>
        <li>Automated inactivity detection</li>
        <li>Alert-based monitoring</li>
      </ul>

      <h5 className="mt-3">Ethics & Privacy</h5>
      <p className="text-muted">
        This system does not collect biometric, medical, or personally
        identifiable data. All data shown is simulated and used solely
        for academic and development purposes.
      </p>

      <h5 className="mt-3">Scalability</h5>
      <p className="text-muted">
        The platform is designed to integrate with real sensor hardware,
        cloud-based storage, and alerting services in future versions.
      </p>
    </main>
  );
}
