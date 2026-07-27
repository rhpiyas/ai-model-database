document.getElementById("searchBtn").addEventListener("click", act);

const searchMessage = document.getElementById("searchMessage");

function setMessage(message)
{
    searchMessage.innerText = message;
}

function clearMessage()
{
    searchMessage.innerText = "";
}

async function act()
{
    const id = document.getElementById("searchModel").value;

    try
    {
        const rawData = await fetch("http://localhost:3000/read/" + id);

        if (!rawData.ok)
        {
            throw new Error("Not Found");
        }

        const data = await rawData.json();

        clearMessage();

        document.getElementById("model-id").innerText = data.modelId;
        document.getElementById("model-name").innerText = data.modelName;
        document.getElementById("model-developer").innerText = data.developer;
        document.getElementById("model-release-year").innerText = data.releaseYear;
    }
    catch(err)
    {
        setMessage("No model matched that ID. Please verify the value and try again.");

        document.getElementById("model-id").innerText = "";
        document.getElementById("model-name").innerText = "";
        document.getElementById("model-developer").innerText = "";
        document.getElementById("model-release-year").innerText = "";
    }
}