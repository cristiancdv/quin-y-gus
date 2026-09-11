const createAlbum = async (accessToken: string, albumTitle: string) => {
  const response = await fetch("https://photoslibrary.googleapis.com/v1/albums", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      album: {
        title: albumTitle,
      },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Error al crear el álbum:", data);
    throw new Error("No se pudo crear el álbum en Google Photos");
  }

  console.log("¡Álbum creado con éxito! ID:", data.id);
  return data.id; // Este es el ID real que tenés que usar en batchCreate
};
createAlbum("", "Boda_Quin_Y_Gus")