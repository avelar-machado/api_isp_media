async function uploadImage() {
    const username = 'evandro';
    const file = document.getElementById('imageInput').files[0];
    const descricao = document.getElementById('descricaoImg').value;

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch(`http://localhost:3000/upload/image/${username}`, {
            method: 'POST',
            body: formData
        });

        // se a imagem for carregada correctamente
        if (response.ok) {
            const data = await response.json();
            // tentar inserir na bd
            const imagem_ = {
                "user_Id": 2,
                "url": data.path,
                "descricao": descricao,
                "nome_ficheiro": data.filename,
                "extensao": data.mimetype
            }
            // realizar insert na bd
            const insert = await fetch(`http://localhost:3000/images`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(imagem_)
            });

            if (insert.ok) {
                alert('Image uploaded successfully!');
            } else {
                const insertData = await insert.json();
                alert(`Error inserting image to database: ${insertData.error}`);
            }

        } else {
            const data = await response.json();
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        alert("Não foi possível carregar a imagem");
    }
}

async function uploadVideo() {
    const username = 'evandro';
    const file = document.getElementById('videoInput').files[0];
    const descricao = document.getElementById('descricaoVideo').value;

    const formData = new FormData();
    formData.append('video', file);
    try {
        // rota para fazer upload no servidor
        const response = await fetch(`http://localhost:3000/upload/video/${username}`, {
            method: 'POST',
            body: formData
        });

        // tentar inserir na bd
        if (response.ok) {
            const data = await response.json();
            // tentar inserir na bd
            const video_ = {
                "user_Id": 2,
                "url": data.path,
                "descricao": descricao,
                "nome_ficheiro": data.filename,
                "extensao": data.mimetype
            }
            // realizar insert na bd
            const insert = await fetch(`http://localhost:3000/videos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(video_)
            });

            // caso o video seja registado na bd
            if (insert.ok) {
                alert('Video uploaded successfully!');
            } else {
                const insertData = await insert.json();
                alert(`Error inserting video to database: ${insertData.error}`);
            }

            console.log(data.filename);
        } else {
            const data = await response.json();
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        alert("Não foi possível carregar a imagem");
    }
}


async function uploadMusic() {
    const username = 'evandro';
    const file = document.getElementById('musicInput').files[0];

    const formData = new FormData();
    formData.append('music', file);

    const response = await fetch(`http://localhost:3000/upload/music/${username}`, {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        alert('Music uploaded successfully!');

    } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
    }
}

