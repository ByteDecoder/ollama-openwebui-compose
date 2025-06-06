const converter = new showdown.Converter();

async function run() {
  let prompt = document.querySelector("#question").value;

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "deepseek-r1:1.5b",
      prompt: prompt,
      stream: true,
    }),
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let compiledResponse = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    let chunkJson = JSON.parse(chunk);
    compiledResponse += chunkJson.response;
    compiledResponse = compiledResponse.replace("<think>", `<div id="think">`);
    compiledResponse = compiledResponse.replace("</think>", `</div>`);
    document.querySelector("#answer").innerHTML =
      converter.makeHtml(compiledResponse);
  }
}
