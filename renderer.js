window.onload = async () => {
  const username = "javaadde";

  const graphElement = document.getElementById("graph");

  async function fetchContributions() {
    const res = await fetch(`https://api.github.com/users/${username}/events`);
    const data = await res.json();

    const today = new Date().toDateString();
    let count = 0;

    data.forEach(event => {
      if (new Date(event.created_at).toDateString() === today) {
        if (event.type === "PushEvent") count += 1;
      }
    });

    graphElement.innerText = `Today's pushes: ${count}`;
  }

  fetchContributions();
  setInterval(fetchContributions, 1000 * 60 * 60); // refresh every hour
};
