window.addEventListener("load", () => {

    // Load chrome storage
    chrome.storage.sync.get((data) => {

        // Show in settings
        document.querySelector("#token").value = data.token
        document.querySelector("#domainkey").value = data.domainkey

        // Check chrome storage
        if (data.token === undefined || data.domainkey === undefined || data.token.length <= 0 || data.domainkey.length <= 0) {

            // Delete settings
            document.querySelector("#token").value = ""
            document.querySelector("#domainkey").value = ""

            // Change css classes
            document.querySelector("#form").classList.add("d-none")
            document.querySelector("#settings").classList.toggle("d-none")
        } else {

            // Load clients
            fetch("https://" + document.querySelector("#domainkey").value + ".timev2.de/api/v1/clients", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": document.querySelector("#token").value
                }
            })
                .then(response => response.json())
                .then(data => {
                    for (let i = 0; i < data.clients.length; i++) {
                        let p = document.createElement("option")
                        p.innerText =data.clients[i].name
                        p.value = data.clients[i].id
                        document.querySelector("#clients").appendChild(p)
                    }
                })

            // Load projects
            fetch("https://" + document.querySelector("#domainkey").value + ".timev2.de/api/v1/projects", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": document.querySelector("#token").value
                }
            })
                .then(response => response.json())
                .then(data => {
                    for (let i = 0; i < data.projects.length; i++) {
                        let p = document.createElement("option")
                        p.innerText =data.projects[i].name
                        p.value = data.projects[i].id
                        document.querySelector("#projects").appendChild(p)
                    }
                })

        }

    })
  
  })
  
    // Send data to server
    document.querySelector("#send").addEventListener("click", () => {
        if (document.querySelector("#time").value === "00:00" || document.querySelector("#clients").value.length <= 0 || document.querySelector("#projects").value.length <= 0 || document.querySelector("#description").value.length <= 0) {
            document.querySelector("#errorfill").classList.remove("d-none")
        } else {
            let xhr = new XMLHttpRequest()
            xhr.open("POST", "https://" + document.querySelector("#domainkey").value + ".timev2.de/api/v1/times", true)
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.setRequestHeader("authorization", document.querySelector("#token").value)
            xhr.send(JSON.stringify({
                "time": document.querySelector("#time").value,
                "client": document.querySelector("#clients").value,
                "project": document.querySelector("#projects").value,
                "description": document.querySelector("#description").value
            }))
            xhr.onload = () => {
                if (xhr.readyState === xhr.DONE) {
                    if (xhr.status === 200) {
                        location.reload()
                    } else {
                        document.querySelector("#errorsend").classList.remove("d-none")
                    }
                }
            }
        }
    })

    // Add animation to edit button
    document.querySelector("#edit").addEventListener("mouseover", () => {

        // Change css classes
        document.querySelector("#edit").classList.add("animate__animated", "animate__heartBeat")

        // Change back
        setTimeout(() => {

            // Change css classes
            document.querySelector("#edit").classList.remove("animate__animated", "animate__heartBeat")

        }, 1000)

    })
  
    // Open settings
    document.querySelector("#edit").addEventListener("click", () => {

        // Change css classes
        document.querySelector("#form").classList.add("d-none")
        document.querySelector("#settings").classList.toggle("d-none")

    })
  
    // Close settings
    document.querySelector("#cancel").addEventListener("click", () => {

        // Change css classes
        document.querySelector("#form").classList.toggle("d-none")
        document.querySelector("#form").classList.add("animate__animated", "animate__fadeIn")
        document.querySelector("#settings").classList.toggle("d-none")

    })

    // Save data to chrome storage
    document.querySelector("#save").addEventListener("click", () => {

        // Set chrome storage
        chrome.storage.sync.set({
            "domainkey": document.querySelector("#domainkey").value,
            "token": document.querySelector("#token").value
        })

        // reload page
        location.reload()

    })