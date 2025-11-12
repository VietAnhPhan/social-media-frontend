function ContentWrapper({ children }) {
  return (
    <>
      <div className="mt-5 bg-white p-5 rounded-lg border-purple-200 border-2">
        {children}
      </div>
    </>
  );
}

export { ContentWrapper };
