import React from "react";

interface DogImageProps {
  imageUrl?: string;
  isFetching: boolean;
  onRefetch: () => void;
}

export const DogImage: React.FC<DogImageProps> = ({
  imageUrl,
  isFetching,
  onRefetch,
}) => {
  return (
    <>
      {isFetching && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#72b2f7",
            borderRadius: "4px",
            marginBottom: "15px",
          }}
        >
          <p>Fetching new dog from server...</p>
        </div>
      )}
      <img
        src={imageUrl}
        alt="Random Dog"
        height={500}
        width={500}
        style={{ objectFit: "cover" }}
      />
      <p>{imageUrl}</p>
      <br />
      <div style={{ marginTop: "15px" }}>
        <button
          onClick={onRefetch}
          style={{ padding: "8px 16px", fontSize: "16px" }}
        >
          Get New Dog
        </button>
      </div>
    </>
  );
};
