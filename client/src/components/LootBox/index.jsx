// import "./styles.css";
// import chest from '../../images/chest.png';
import chest from '../../images/closedChest2.png'
import "../../App.css";

export default function LootBox() {
  return (
    <>

    <div className="loot-box" data-testid = "lootBox">
    <p>A LootBox! need 3 keys to open</p>

      {/* <div className="chest">
        <div className="chest_keyholeBG">
          <div className="chest_keyhole"></div>
        </div> */}
      <img data-testid = "chest" src={chest} alt="chest" style={{height:"200px"}}/>
      </div>
    </>
  );
}
