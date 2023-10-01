'use client'

import {useEffect, useState} from 'react';


import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';

import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import DeleteIcon from '@mui/icons-material/Delete';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Grid4x4 from '@mui/icons-material/Grid4x4';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AnimationIcon from '@mui/icons-material/Animation';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

import { Slider, colors } from '@mui/material';

import drawLineDDA from './algorithms/DDA_Algorithm';
import drawLineBresenham from './algorithms/Bresenham_Algorithm';
import drawLineAntialiasing from './algorithms/Antialiasing_Algorithm';
import debugGrid from './algorithms/debugGrid';
import drawParabola from './algorithms/Parabola_Algorithm';
import drawCircle from './algorithms/Circle_Algorithm';
import drawEllipse from './algorithms/Ellipse_Algorithm';
import drawHyperbola from './algorithms/Hyperbola_Algorithm';



const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}


export default function Home(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [debug, setDebug] = useState<boolean>(false);
  const [selectedButton, setSelectedButton] = useState<string>("");

  const [pixelSize, setPixelSize] = useState<number>(1);

  let clicked: boolean = false; 

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Debug', 'Clear'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => handleClick(text)}
              >
              <ListItemIcon>
                {index % 2 === 0 ? <Grid4x4 /> : <DeleteIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <BorderColorIcon />
            <Typography className='ml-8'>Lines</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {['Line DDA' ,'Bresenham', 'Antialiasing'].map((text, index) => (
              <ListItem
                key={text}
                disablePadding
              >
                <ListItemButton onClick={() => {
                  setSelectedButton(text);
                  remove();
                  handleLinesClick(text);
                  }}
                  selected={true ? selectedButton === text : false}
                >
                  <ListItemIcon>
                    <AutoGraphIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <AnimationIcon />
            <Typography className='ml-8'>Second-order lines</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {['Circle' ,'Ellipse', 'Parabola', 'Hyperbola'].map((text, index) => (
              <ListItem
                key={text}
                disablePadding
              >
                <ListItemButton onClick={() => {
                  setSelectedButton(text);
                  remove();
                  handleLinesClick(text);
                  }}
                  selected={true ? selectedButton === text : false}
                >
                  <ListItemIcon>
                    <PanoramaFishEyeIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </AccordionDetails>
        </Accordion>
      </List>
      <Divider />
      <List>
        {[].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List className='items-center'>
        <Typography>Pixel Size</Typography>
        <Slider
          className='ml-5 w-[80%]'
          defaultValue={1}
          min={1}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={(event, value) => handleSlider(value)}
        />
      </List>
    </div>
  );
  
  const container = window !== undefined ? () => window().document.body : undefined;
  
  function getMousePos(canvas: HTMLCanvasElement, evt: any) {
    var rect = canvas.getBoundingClientRect();

    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
  

  function remove() {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;

    clicked = true;
    if (clicked === true) {
      canvas.replaceWith(canvas.cloneNode(true));
    }
  }


  function handleSlider(value:number | number[]) {
    const size = Array.isArray(value) ? value[0] : value;
    setPixelSize(size);
  }


  function handleClick(buttonType:string) {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    if (canvas.getContext) {
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

      if (buttonType === 'Clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      
      if (buttonType === 'Debug') {
        setDebug(!debug);
        remove();
      }

    }

  }


  const debugListener = (evt: KeyboardEvent, ctx: CanvasRenderingContext2D, coordinates: number[][], coordinatesPrev:number[][] = [], color:string = 'black') => {
    ctx.fillStyle = color;
    
    if (evt.key === 'ArrowRight' && coordinates.length !== 0) {

      if (coordinates[0].length === 3) {
        ctx.globalAlpha = coordinates[0][2];
      }

      ctx.fillRect(coordinates[0][0], coordinates[0][1], pixelSize, pixelSize);
      coordinatesPrev.unshift(coordinates.shift()!);
    }

    if (evt.key === 'ArrowLeft' && coordinatesPrev.length !== 0) {

      if (coordinatesPrev[0].length === 3) {
        ctx.globalAlpha = coordinatesPrev[0][2];
      }

      ctx.clearRect(coordinatesPrev[0][0], coordinatesPrev[0][1], pixelSize, pixelSize);
      coordinates.unshift(coordinatesPrev.shift()!);
    }
    
  }


  function handleLinesClick(buttonType:string) {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    if (canvas.getContext) {
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        
      let pointsCount: number = 0;
      let startPoints:number[] = [];
      let endPoints:number[] = [];

      const listener = (evt: MouseEvent) => {
        const mousePos = getMousePos(canvas, evt);
        pointsCount++;

        if (pointsCount === 1) {
          startPoints = [mousePos.x, mousePos.y];
        }
        else if (pointsCount === 2) {
          endPoints = [mousePos.x, mousePos.y];
         
          if (debug) {
            let coordinates:number[][] = [];
            const coordinatesPrev:number[][] = [];

            const debugColor = 'rgba(255, 255, 255, 0)';

            if (buttonType === 'Line DDA') {
              coordinates = drawLineDDA(ctx, [startPoints[0], startPoints[1]], [endPoints[0], endPoints[1]], debugColor, pixelSize);
            }
            else if (buttonType === 'Bresenham') {
              coordinates = drawLineBresenham(ctx, [startPoints[0], startPoints[1]], [endPoints[0], endPoints[1]], debugColor, pixelSize);
            }
            else if (buttonType === 'Antialiasing') {
              coordinates = drawLineAntialiasing(ctx, [startPoints[0], startPoints[1]], [endPoints[0], endPoints[1]], debugColor, pixelSize);
            }
            else if (buttonType === 'Circle') {
              coordinates = drawCircle(ctx, [startPoints[0], startPoints[1]], [endPoints[0], endPoints[1]], debugColor, pixelSize);
            }
            else if (buttonType === 'Ellipse') {
              coordinates = drawEllipse(ctx, [startPoints[0], startPoints[1]], [endPoints[0], endPoints[1]], debugColor, pixelSize);
            }
            else if (buttonType === 'Parabola') {
              coordinates = drawParabola(ctx, [startPoints[0], startPoints[1]], [endPoints[0], endPoints[1]], debugColor, pixelSize);
            }
            else if (buttonType === 'Hyperbola') {
              coordinates = drawHyperbola(ctx, [startPoints[0], startPoints[1]], [endPoints[0], endPoints[1]], debugColor, pixelSize);
            }


            document.addEventListener('keydown', (evt) => {debugListener(evt, ctx, coordinates, coordinatesPrev)});
          } else {

            if (buttonType === 'Line DDA') {
              drawLineDDA(ctx, [startPoints[0], startPoints[1]], [endPoints[0], endPoints[1]], 'blue', pixelSize);
            }
            else if (buttonType === 'Bresenham') {
              drawLineBresenham(ctx, [startPoints[0], startPoints[1]], [endPoints[0], endPoints[1]], 'green', pixelSize);
            }
            else if (buttonType === 'Antialiasing') {
              drawLineAntialiasing(ctx, [startPoints[0], startPoints[1]], [endPoints[0], endPoints[1]], 'black', pixelSize);
            }
            else if (buttonType === 'Circle') {
              drawCircle(ctx, [startPoints[0], startPoints[1]], [endPoints[0], endPoints[1]], 'black', pixelSize);
            }
            else if (buttonType === 'Ellipse') {
              drawEllipse(ctx, [startPoints[0], startPoints[1]], [endPoints[0], endPoints[1]], 'black', pixelSize);
            }
            else if (buttonType === 'Parabola') {
              drawParabola(ctx, [startPoints[0], startPoints[1]], [endPoints[0], endPoints[1]], 'black', pixelSize);
            }
            else if (buttonType === 'Hyperbola') {
              drawHyperbola(ctx, [startPoints[0], startPoints[1]], [endPoints[0], endPoints[1]], 'black', pixelSize);
            }
            
          }
            
          pointsCount = 0;
        }
      }
      canvas.addEventListener('click', listener);
    }
    clicked = false;
  }

  
  useEffect(() => {
    const canvas = document.getElementById('canvas2') as HTMLCanvasElement;
    canvas.replaceWith(canvas.cloneNode(true));

    const secondCanvas = document.getElementById('canvas2') as HTMLCanvasElement;
    const secondCtx = secondCanvas.getContext('2d') as CanvasRenderingContext2D;

    if (debug) {
      debugGrid(secondCtx, secondCanvas.width, secondCanvas.height, pixelSize);
    }

  }, [debug, pixelSize]);


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Graphic Editor
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <div className="relative">
          <canvas id="canvas" width="1200" height="720" 
            className='absolute left-0 top-0 z-40 border'>
          </canvas>
          <canvas id="canvas2" width="1200" height="720" 
            className='absolute left-0 top-0 z-0 border'>
          </canvas>
        </div>
      </Box>
    </Box>
  );
}