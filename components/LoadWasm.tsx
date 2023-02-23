import React, { useState, useEffect } from 'react';
import Script from 'next/script'
//https://github.com/microsoft/TypeScript/issues/42209
declare global { const Go: any }

const LoadWasm = () => {
  const [wasmModule, setWasmModule] = useState<WebAssembly.Module | null>(null);

  useEffect(() => {
    (async () => {
      const wasmResponse = await fetch('./bubbleversus/game.wasm');
      const wasmArrayBuffer = await wasmResponse.arrayBuffer();
      const wasmModule = await WebAssembly.compile(wasmArrayBuffer);
      setWasmModule(wasmModule);
    })();
  }, []);

  return true ? (
    <div>
      <h1>Wasm Module Loaded</h1>
      <>
      <Script src="./bubbleversus/wasm_exec.js"   onLoad={() => {
                      const go = new Go();
                      WebAssembly.instantiateStreaming(fetch("./bubbleversus/game.wasm"), go.importObject).then((result) => {
                          go.run(result.instance);
                      });
        }} />

    </>
      
    </div>
  ) : (
    <div>
      <h1>Loading Wasm Module...</h1>
    </div>
  );
};

export default LoadWasm;