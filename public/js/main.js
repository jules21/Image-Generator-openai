const onsubmit = (e) => {
  e.preventDefault()

  const prompt = document.getElementById('prompt').value
  const size = document.getElementById('size').value

  if (!prompt) {
    alert('enter image spec')
    return
  }

  getImageGenerateRequest(prompt, size)
}
const getImageGenerateRequest = async (prompt, size) => {
    try {
        const res = await fetch('/openai/generate-image', {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                prompt,
                size
            })
        })

        if (!res.ok)
             throw new Error('That image could not be generted');

             const data = await res.json()
             document.getElementById('image').src = data.data.url;
    } catch (error) {
        document.getElementById('msg').textContent = error;
    }
}
document.getElementById('submit-form').addEventListener('submit', onsubmit)
