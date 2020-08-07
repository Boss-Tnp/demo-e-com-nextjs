import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",

    // flex: "1",
    padding: theme.spacing(2),
  },
  gridList: {
    width: 500,
    height: 450,
    transform: "translateZ(0)",
  },
  gridListTile: {
    backgroundColor: "#ffd",
  },
}));

const ImageGrid = (props) => {
  const classes = useStyles();
  const image = props.imageUrl;
  const listImage = [
    {
      img: image[0].nameUrl,
      title: "img1",
      cols: 3,
      featured: true,
    },
    {
      img: image[1].nameUrl,
      title: "img2",
      cols: 1,
      featured: false,
    },
    {
      img: image[2].nameUrl,
      title: "img3",
      cols: 1,
      featured: false,
    },
    {
      img: image[3].nameUrl,
      title: "img4",
      cols: 1,
      featured: false,
    },
  ];
  return (
    <div className={classes.root}>
      <GridList
        spacing={1}
        cellHeight={100}
        className={classes.gridList}
        cols={3}
      >
        {listImage.map((tile) => (
          <GridListTile
            key={tile.title}
            cols={tile.featured ? 3 : 1}
            rows={tile.featured ? 3 : 1}
          >
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default ImageGrid;
