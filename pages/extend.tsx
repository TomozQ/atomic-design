import { NextPage } from "next";
import styled from "styled-components";

const Text = styled.p`
    color: blue;
    font-weight: bold;
`

const BorderText = styled(Text)`
    padding: 8px 16px;
    border: 3px solid blue;
    border-radius: 8px;
`

const Page: NextPage = () => {
    return (
        <div>
            <Text>Hello</Text>
            <BorderText>World</BorderText>
        </div>
    )
}

export default Page