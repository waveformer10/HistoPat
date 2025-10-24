import React from "react";


interface PathProps {
  path: string[];
}

// Talvez refatorar para permitir o clique, navegando para a rota

export function Path({ path }: PathProps) {
  return (
    <div className="flex items-center text-gray-500 font-medium text-sm">
      <span className="!mx-1 text-gray-700 font-bold">Caminho: </span>
      {path.map((segment, index) => (
        <React.Fragment key={index}>
          <span>{segment}</span>
          {index < path.length - 1 && (
            <span className="!mx-1 text-gray-400"> \ </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}