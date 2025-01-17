function App({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <header className="container-fluid text-center">header</header>
      <main className="container grow basis-0">{children}</main>
      <footer className="container-fluid text-center">footer</footer>
    </div>
  );
}

export default App;
