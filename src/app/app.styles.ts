import {createStyles, makeStyles} from "@material-ui/core/styles";

export const useAppStyles = makeStyles(() =>
    createStyles({
        content: {
            backgroundColor: "pink",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            backgroundSize: "cover"
        },
    }),
)