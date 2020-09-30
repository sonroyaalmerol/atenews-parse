import React from 'react';
import { useRouter } from 'next/router';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Hidden from '@material-ui/core/Hidden';
import Tag from 'components/Tag';
import Link from 'components/Link';

import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import AccountIcon from '@material-ui/icons/AccountCircle';
import ClockIcon from '@material-ui/icons/AccessTime';
import PhotoIcon from '@material-ui/icons/PhotoCamera';

import LikeIcon from '@material-ui/icons/ThumbUpOutlined';
import DislikeIcon from '@material-ui/icons/ThumbDownOutlined';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

import { formatDistanceToNow } from 'date-fns';
import slugGenerator from 'utils/slugGenerator';

import Popper from '@material-ui/core/Popper';

const useStyles = makeStyles((theme) => ({
  reacts: {
    width: 25,
    height: 25,
    overflow: 'visible'
  }
}));


const ReactInfo = ({ IconProps, TextProps, GridProps }) => {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div style={{ width: 'fit-content' }} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
        <Grid container spacing={1} {...GridProps}>
          <Grid item>
            <InsertEmoticonIcon {...IconProps} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" {...TextProps}>192</Typography>
          </Grid>
        </Grid>
      </div>

      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement="top-center"
        disablePortal={false}
        modifiers={{
          flip: {
            enabled: false
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: "scrollParent"
          }
        }}
      >
        <Card elevation={0} variant="outlined">
          <CardContent>
            <Grid container spacing={2}>
              <Grid item>
                <Avatar className={classes.reacts} src="/reacts/happy.svg" />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">38</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item>
                <Avatar className={classes.reacts} src="/reacts/sad.svg" />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">38</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item>
                <Avatar className={classes.reacts} src="/reacts/angry.svg" />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">38</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item>
                <Avatar className={classes.reacts} src="/reacts/disgusted.svg" />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">38</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item>
                <Avatar className={classes.reacts} src="/reacts/worried.svg" />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">2</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Popper>
    </>
  )
}

export default ReactInfo;