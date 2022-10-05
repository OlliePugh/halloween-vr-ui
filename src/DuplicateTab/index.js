const DuplicateTab = ({ setAsMain }) => {
    return (
        <div
            style={{
                position: "absolute",
                padding: "2%",
                width: "30%",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "black",
                border: "white solid 2px",
                borderRadius: "25px",
                zIndex: 100,
                color: "white",
                textAlign: "center"
            }}
        >
            <div id="duplicate-content">
                <h2>Duplicate Tabs Detected</h2>
                <p>
                    Looks like we already have you in the queue in another
                    browser
                </p>
                <br />
                <p>Would you like to make this your main tab?</p>
                <button id="duplicate-tab-button" onClick={setAsMain}>
                    <p>Make this my main tab</p>
                </button>
            </div>
        </div>
    );
};

export default DuplicateTab;
