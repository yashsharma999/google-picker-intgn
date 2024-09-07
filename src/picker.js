let tokenClient = null;
let accessToken = null;

function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id:
            "1097436363184-kfjfr26rv45qo75c52eilufd5p7pk3k2.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/drive.readonly",
        callback: "",
    });
}


function creatPicker() {
    try {

        function showPicker() {
            var view = new google.picker.View(
                google.picker.ViewId.DOCS,
            ).setMimeTypes("application/pdf");
        
            const picker = new google.picker.PickerBuilder()
                .addView(view)
                .setOAuthToken(accessToken)
                .setDeveloperKey("AIzaSyBg0Afn-O8_uvLtcHt69rEohNQ9HFSo3Yo")
                .setCallback(pickerCallback)
                .setAppId("papermark-399017")
                .build();
        
            picker.setVisible(true);
        }

        tokenClient.callback = async (response) => {
            if (response.error !== undefined) {
                throw response;
            }
            accessToken = response.access_token;
            showPicker();
        };

        if (accessToken === null) {
            // Prompt the user to select a Google Account and ask for consent to share their data
            // when establishing a new session.
            tokenClient.requestAccessToken({ prompt: "consent" });
        } else {
            // Skip display of account chooser and consent dialog for an existing session.
            tokenClient.requestAccessToken({ prompt: "" });
        }

    } catch (err) {
        console.log("err while showing picker", err)
    }
}

function pickerCallback(data) {
    let url = "nothing";
    if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
        let doc = data[google.picker.Response.DOCUMENTS][0];
        console.log("came here doc info", doc);
        url = doc[google.picker.Document.URL];
        console.log('url', url)
    }
}

function loadPicker() {
    gisLoaded();
}

export {
    loadPicker,
    creatPicker
}

