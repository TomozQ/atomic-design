import { NextPage } from "next";
import styled from "styled-components";

const Text = styled.span`
    color: ${(props) => props.theme.colors.red};
    font-size: ${(props) => props.theme.fontSizes[3]};
    margin: ${(props) => props.theme.space[2]};
    font-family: ${(props) => props.theme.fonts.primary};
`

const Page: NextPage = () => {
    return (
        <div>
            <Text>Themeから参照した色を使用しています</Text>
        </div>
    )
}

export default Page