export const doTask = async () => {
  try {
    const response = await fetch(
      'http://oring_server_check_bot.oringapp.workers.dev/check/'
    );
    const { status } = response;
    console.log({ status: 'good' });
    return new Response(JSON.stringify({ status: status }));
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: `${error}` }), {
      status: 500,
    });
  }
};

export default doTask;
