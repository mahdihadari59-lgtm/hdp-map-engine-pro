import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("=== REACT ERROR ===");
    console.error(error);
    console.error(info);
    this.setState({ info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: 20,
          color: "#fff",
          background: "#1a1a2e",
          fontFamily: "system-ui, sans-serif",
          direction: "rtl",
          minHeight: "100vh"
        }}>
          <h2 style={{ color: "#f44336", marginBottom: 10 }}>⚠️ خطا در برنامه</h2>
          <p style={{ color: "#aaa", marginBottom: 20 }}>لطفاً این متن را کپی کرده و بفرستید:</p>
          
          <div style={{ background: "#000", padding: 15, borderRadius: 8, marginBottom: 15, overflow: "auto" }}>
            <h4 style={{ color: "#ff9800", margin: "0 0 10px 0" }}>پیام خطا:</h4>
            <pre style={{ color: "#f44336", fontSize: 14, margin: 0 }}>{this.state.error?.toString()}</pre>
            
            <h4 style={{ color: "#4fc3f7", margin: "15px 0 10px 0" }}>Stack Trace:</h4>
            <pre style={{ color: "#81c784", fontSize: 11, margin: 0, whiteSpace: "pre-wrap" }}>{this.state.error?.stack}</pre>
            
            <h4 style={{ color: "#ffd54f", margin: "15px 0 10px 0" }}>Component Stack:</h4>
            <pre style={{ color: "#ce93d8", fontSize: 11, margin: 0 }}>{this.state.info?.componentStack}</pre>
          </div>
          
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: "12px 24px",
              background: "#4fc3f7",
              color: "#1a1a2e",
              border: "none",
              borderRadius: 8,
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: 14
            }}
          >
            🔄 رفرش صفحه
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
