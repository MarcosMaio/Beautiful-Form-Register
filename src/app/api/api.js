export default async function sendDataToEndpoint(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    return { status: response.status, data: responseData };
  } catch (error) {
    console.error("Erro inesperado:", error);
    return { status: 500, data: null };
  }
}
