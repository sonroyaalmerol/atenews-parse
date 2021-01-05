import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Tag from '@/components/General/Tag';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';
import ReactInfo from '@/components/Social/ReactInfo';

import {
  Typography, Paper, Grid,
} from '@material-ui/core';

import useFirebaseDatabase from '@/utils/hooks/useFirebaseDatabase';

const useStyles = makeStyles((theme) => ({
  bannerImage: {
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  bannerDetailsContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundImage: 'linear-gradient(180deg, transparent, black)',
  },
  bannerDetails: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    color: 'white',
    padding: theme.spacing(4),
  },
  trendingHead: {
    background: '#195EA9',
    color: '#ffffff',
    padding: 20,
    minHeight: 65,
    textAlign: 'center',
    width: '100%',
  },
  trendingItem: {
    position: 'relative',
    width: '100%',
    borderRadius: 0,
    borderBottom: 0,
    borderRight: 0,
    borderLeft: 0,
    padding: theme.spacing(2),
  },
  trendingStats: {
    color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white',
  },
  trendingStatsText: {
    fontSize: '0.8rem',
  },
  arrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    top: 'calc(70px + 25px)',
    right: 0,
    borderTop: '20px solid transparent',
    borderBottom: '20px solid transparent',
    borderRight: `20px solid ${theme.palette.background.default}`,
    zIndex: 1,
  },
  twoLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    fontSize: '0.9rem',
  },
  threeLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
}));

function RecentArticle({ article }) {
  const classes = useStyles();
  const { getDocument } = useFirebaseDatabase();

  const [socialStats, setSocialStats] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = getDocument(`articles/${article.slug}`, (doc) => {
      setSocialStats(doc);
    });

    return () => {
      unsubscribe.off();
    };
  }, [article]);

  return (
    <Paper
      variant="outlined"
      className={classes.trendingItem}
    >
      <Grid
        container
        direction="column"
        spacing={1}
        justify="space-between"
      >
        <Grid
          item
        >
          <Tag type={article.categories_detailed[0]} />
        </Grid>
        <Grid
          item
        >
          <Typography
            variant="body1"
            component="div"
            className={classes.twoLineText}
            dangerouslySetInnerHTML={{ __html: article.title.rendered }}
          />
        </Grid>
        <Grid
          item
        >
          <Grid
            container
            spacing={2}
            className={classes.trendingStats}
            justify="space-between"
          >
            <Grid
              item
              xs
            >
              <ReactInfo
                IconProps={{ className: classes.trendingStatsText }}
                TextProps={{ className: classes.trendingStatsText }}
                GridProps={{ alignItems: 'center' }}
                socialStats={socialStats}
                disableHover
              />
            </Grid>
            <Grid
              item
              xs
            >
              <Grid
                container
                spacing={1}
                alignItems="center"
              >
                <Grid item>
                  <CommentIcon className={classes.trendingStatsText} />
                </Grid>
                <Grid item>
                  <Typography
                    className={classes.trendingStatsText}
                    variant="subtitle2"
                  >
                    {socialStats ? socialStats.commentCount : 0}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs
            >
              <Grid
                container
                spacing={1}
                alignItems="center"
              >
                <Grid item>
                  <ShareIcon className={classes.trendingStatsText} />
                </Grid>
                <Grid item>
                  <Typography
                    className={classes.trendingStatsText}
                    variant="subtitle2"
                  >
                    {socialStats ? socialStats.shareCount || 0 : 0}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default RecentArticle;
