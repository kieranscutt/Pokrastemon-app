import React, {useState} from "react"
import '../../App.css'
import SettingsForm from "../SettingsForm"

const SettingsModal = ({handleClose, show}) => {

    const showHideClassName = show ? "settings-modal display-block" : "settings-modal display-none"

    return(
        <div className={showHideClassName} data-testid="settings settingsModalTest">
            <section className="modal-main" data-testid = "modalMain">
                <SettingsForm handleClose={handleClose}/>
            </section>
        </div>
    )

}

export default SettingsModal
