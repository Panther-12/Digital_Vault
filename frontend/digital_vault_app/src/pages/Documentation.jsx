import NavBar from "../components/NavBar";

const Documentation = () => {
  return (
    <div className="w-full flex flex-col">
      <NavBar />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-8">Welcome to Digital Vault Documentation</h1>
        <div className="max-w-2xl text-lg text-gray-700">
          <p className="mb-4">Digital Vault is your ultimate solution for managing all your membership cards in one secure place. Say goodbye to the hassle of carrying physical cards and the frustration of missing out on rewards and benefits.</p>
          <p className="mb-4">With Digital Vault, you can:</p>
          <ul className="list-disc pl-8 mb-4">
            <li>Store all your membership cards digitally, accessible anytime, anywhere.</li>
            <li>Categorize and organize your cards for quick and easy retrieval.</li>
            <li>Receive renewal alerts and notifications for upcoming expirations and special offers.</li>
            <li>Share specific cards digitally with family and friends.</li>
            <li>Contribute to environmental sustainability by reducing the production of physical cards.</li>
          </ul>
          <p className="mb-4">Our user-friendly interface and robust security measures ensure that your sensitive information remains safe and protected.</p>
          <p className="mb-4">Join the Digital Vault community today and experience the convenience and peace of mind that comes with efficient card management.</p>
        </div>
      </div>
    </div>
  );
}

export default Documentation;
