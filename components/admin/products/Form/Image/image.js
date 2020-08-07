import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  card: {
    maxWidth: 345,
  },
  media: {
    // height: 140,
  },
  rootGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    width: 500,
    // height: 500,
  },
  imgTile: {
    left: "50%",
    height: "100%",
    position: "relative",
    transform: "translateX(-50%)",
  },
}));

const Image = (props) => {
  const classes = useStyles();

  const [openImage, setOpenImage] = useState(false);

  //   useEffect(() => {
  //     if (!selectedFile) {
  //       setPreview(undefined);
  //       return;
  //     }

  //     const objectUrl = URL.createObjectURL(selectedFile);
  //     console.log(objectUrl);
  //     setPreview(objectUrl);

  //     // free memory when ever this component is unmounted
  //     return () => URL.revokeObjectURL(objectUrl);
  //   }, [selectedFile]);

  const handleOpen = () => {
    setOpenImage(true);
  };

  const handleClose = () => {
    setOpenImage(false);
  };
  return (
    <div className={classes.rootGrid}>
      <input
        accept="image/*"
        className={classes.input}
        id="upload-id"
        name="upload"
        type="file"
        multiple
        onChange={props.onSelectFile}
      />
      <label htmlFor="upload-id">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Upload
        </Button>
      </label>
      <GridList cellHeight={200} className={classes.gridList} cols={3}>
        {props.imagePreview.map((img) => (
          <GridListTile key={img.alt} cols={img.cols || 1} rows={img.rows || 1}>
            <img src={img.img} alt={img.alt} />

            {/* <Card>
              <CardActionArea>
                <label htmlFor={img.inputFileId}>
                  <CardMedia
                    className={classes.media}
                    image={img.img}
                    title={img.alt}
                  ></CardMedia>
                </label>
              </CardActionArea>
            </Card> */}
          </GridListTile>
        ))}
      </GridList>
      <Dialog
        open={openImage}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
      >
        <img
          src="https://firebasestorage.googleapis.com/v0/b/e-commerce-24970.appspot.com/o/ADIDAS%2FADIDAS_4D-Run-1.0%2FADIDAS_4D_Run_4.jpg?alt=media&token=9dc6faba-4cf6-4647-8f96-f3b4537e815c"
          alt="img"
        />
      </Dialog>
    </div>
    // <div className={classes.root}>
    //   <input
    //     accept="image/*"
    //     className={classes.input}
    //     id="contained-button-file"
    //     multiple
    //     type="file"
    //     onChange={onSelectFile}
    //   />

    //   <Card className={classes.card}>
    //     <CardActionArea>
    //       <label htmlFor="contained-button-file">
    //         <CardMedia
    //           className={classes.media}
    //           image="https://lunawood.com/wp-content/uploads/2018/02/placeholder-image.png"
    //           title="Contemplative Reptile"
    //         ></CardMedia>
    //       </label>
    //     </CardActionArea>
    //   </Card>
    // </div>
  );
};

export default Image;
