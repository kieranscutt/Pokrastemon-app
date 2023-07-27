import React, {useState} from "react"
import '../../App.css'
import SettingsForm from "../SettingsForm"

const SettingsModal = ({handleClose, show}) => {

    const showHideClassName = show ? "settings-modal display-block" : "settings-modal display-none"

    return(
        <div data-testid='settingsModalTest' className={showHideClassName}>
            <section className="modal-main">
                <SettingsForm handleClose={handleClose}/>
            </section>
        </div>
    )

}

export default SettingsModal
