import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export const useTaskStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            marginTop: "16px",
        },
        title: {
            fontFamily: "roboto",
            paddingLeft: 0
        },
        listItem: {
            display: "flex",
            justifyContent: "space-between",
            padding: "0",
            marginLeft: "4px"
        },
        iconBlock: {}
    }),
);