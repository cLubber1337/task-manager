import {createStyles, makeStyles} from "@material-ui/core/styles";

export const useAppStyles = makeStyles(() =>
    createStyles({
        content: {
            textAlign: "center",
            backgroundColor: "pink",
            backgroundRepeat: "repeat"
        },
    }),
)