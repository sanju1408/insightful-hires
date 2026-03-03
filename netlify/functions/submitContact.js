exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Contact form submitted successfully",
        data
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Something went wrong"
    };
  }
};
