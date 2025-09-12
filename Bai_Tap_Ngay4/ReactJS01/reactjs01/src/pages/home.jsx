import { CrownFilled } from "@ant-design/icons";
import {Result} from 'antd'

const HomePage = () => {
    return (
        <div style={{padding: 20}}>
            <Result>
                icon = {<CrownFilled/>}
                title="JSON Web Token (Reat/Node.JS) - iostar.vn"
            </Result>
        </div>
    )
}

export default HomePage;
