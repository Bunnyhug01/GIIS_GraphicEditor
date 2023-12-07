'use client'

import * as React from 'react';
import {useEffect, useState} from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';

import IconButton from '@mui/material/IconButton';

import BorderColorIcon from '@mui/icons-material/BorderColor';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import Grid4x4 from '@mui/icons-material/Grid4x4';
import AnimationIcon from '@mui/icons-material/Animation';
import PanToolIcon from '@mui/icons-material/PanTool';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import DrawIcon from '@mui/icons-material/Draw';
import GestureIcon from '@mui/icons-material/Gesture';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PanoramaVerticalIcon from '@mui/icons-material/PanoramaVertical';
import PanoramaWideAngleIcon from '@mui/icons-material/PanoramaWideAngle';
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Collapse, styled } from '@mui/material';

import TwoPointGenerator from './generator/TwoPointGenerator';
import DDALineDrawer from './algorithms/drawer/lines/DDALineDrawer';
import { ObjectGenerator } from './generator/ObjectGenerator';
import FourPointGenerator from './generator/FourPointGenerator';
import HermiteDrawer from './algorithms/drawer/curve _lines/HermiteDrawer';
import BezieDrawer from './algorithms/drawer/curve _lines/BezieDrawer';
import { context } from './main';
import BresenhamLineDrawer from './algorithms/drawer/lines/BresenhamLineDrawer';
import MouseMove from './generator/MouseMove';
import AntialiasingLineDrawer from './algorithms/drawer/lines/AntialiasingLineDrawer';
import SpliteToFour from './algorithms/drawer/curve _lines/SpliteToFour';
import BSplinesDrawer from './algorithms/drawer/curve _lines/BSplinesDrawer';
import MultiPointGeneratorImpl from './generator/MultiPointGeneratorImpl';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import CircleDrawer from './algorithms/drawer/Second-order_lines/CircleDrawer';
import EllipseDrawer from './algorithms/drawer/Second-order_lines/EllipseDrawer';
import ParabolaDrawer from './algorithms/drawer/Second-order_lines/ParabolaDrawer';
import HyperbolaDrawer from './algorithms/drawer/Second-order_lines/HyperbolaDrawer';
import ThreeDObject from './algorithms/3D/ThreeDObject';
import PolygonGenerator from './generator/PolygonGenerator';
import GrahamMinimalConvexHullSolver from './objects/solver/GrahamMinimalConvexHullSolver';
import JarvisMinimalConvexHullSolver from './objects/solver/JarvisMinimalConvexHullSolver';
import PointInsidePolygon from './generator/PointInsidePolygon';
import BasePolygonGenerator from './generator/BasePolygonGenerator';
import LineGenerator from './generator/LineGenerator';
import FillPolygonGenerator from './generator/FillPolygonGenerator';
import RasterReamerFiller from './algorithms/drawer/fillers/RasterReamerFiller';
import SimpleInoculumFiller from './algorithms/drawer/fillers/SimpleInoculumFiller';
import RasterReamerActiveEdgeFiller from './algorithms/drawer/fillers/RasterReamerActiveEdgeFiller';
import LineInoculumFiller from './algorithms/drawer/fillers/LineInoculumFiller';


const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

let generator: ObjectGenerator = new LineGenerator(new BresenhamLineDrawer());

function setGenerator(g: ObjectGenerator) {
  generator.end(context)
  generator = g
}


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


export default function Home(props: Props) {

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [color, setColor] = useState<string>("black");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  

  const [open, setOpen] = React.useState("");

  const handleCollapseClick = (item: string) => {
    if (open === item) {
      setOpen("");
    } else {
      setOpen(item);
    }
  };

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    if (selectedIndex === index) {
      setSelectedIndex(null)
    } else {
      setSelectedIndex(index);
    }
  };

  const [threeDRegime, setThreeDRegime] = useState<boolean | null>(false);

  const handleThreeDRegimeClick = () => {
    setThreeDRegime(!threeDRegime);
  };

  
  const [file, setFile] = useState<File>()

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    
    setFile(selectedFiles?.[0]);
  }


  const drawer = (
    <Box>
      <Toolbar />
      <Divider />
      <List>
          <ListItem key='Debug' disablePadding>
            <ListItemButton 
              selected={selectedIndex === 0}
              onClick={(event) => {
                context.changeDebug()
                handleListItemClick(event, 0)
              }}
            >
              <ListItemIcon>
                <Grid4x4/>
              </ListItemIcon>
              <ListItemText primary='Debug'/>
            </ListItemButton>
          </ListItem>

          <ListItem key='Move points' disablePadding>
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => {
                setGenerator(new MouseMove())
                handleListItemClick(event, 1)
              }}
            >
              <ListItemIcon>
                <PanToolIcon/>
              </ListItemIcon>
              <ListItemText primary='Move points'/>
            </ListItemButton>
          </ListItem>

          <ListItem key='Check if polygon have point' disablePadding>
            <ListItemButton
              selected={selectedIndex === 20}
              onClick={(event) => {
                setGenerator(new PointInsidePolygon())
                handleListItemClick(event, 20)
              }}
            >
              <ListItemIcon>
                <HighlightAltIcon/>
              </ListItemIcon>
              <ListItemText primary='Check if polygon have point'/>
            </ListItemButton>
          </ListItem>

          <ListItem key='Clear' disablePadding>
            <ListItemButton onClick={() => context.clear()}>
              <ListItemIcon>
                <DeleteIcon/>
              </ListItemIcon>
              <ListItemText primary='Clear'/>
            </ListItemButton>
          </ListItem>

          <ListItemButton onClick={() => handleCollapseClick("Lines")}>
            <ListItemIcon>
              <BorderColorIcon />
            </ListItemIcon>
            <ListItemText primary="Lines" />
              {open === "Lines" ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open === "Lines" ? true : false} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              
              <ListItemButton sx={{ pl: 4 }}
                selected={selectedIndex === 2} 
                onClick={(event) => {
                  setGenerator(new LineGenerator(new DDALineDrawer()))
                  handleListItemClick(event, 2)
                }}
              >
                <ListItemIcon>
                  <AutoGraphIcon />
                </ListItemIcon>
                <ListItemText primary="Line DDA" />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }} 
                selected={selectedIndex === 3}
                onClick={(event) => {
                  setGenerator(new LineGenerator(new BresenhamLineDrawer()))
                  handleListItemClick(event, 3)
                }}
              >
                <ListItemIcon>
                  <AutoGraphIcon />
                </ListItemIcon>
                <ListItemText primary="Bresenham" />
              </ListItemButton>
              
              <ListItemButton sx={{ pl: 4 }}
              selected={selectedIndex === 4} 
                onClick={(event) => {
                  setGenerator(new LineGenerator(new AntialiasingLineDrawer()))
                  handleListItemClick(event, 4)
                }}
              >
                <ListItemIcon>
                  <AutoGraphIcon />
                </ListItemIcon>
                <ListItemText primary="Antialiasing" />
              </ListItemButton>
            
            </List>
          </Collapse>

          <ListItemButton onClick={() => handleCollapseClick("SecondOrder")}>
            <ListItemIcon>
              <AnimationIcon />
            </ListItemIcon>
            <ListItemText primary="Second-order lines" />
              {open === "SecondOrder" ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open === "SecondOrder" ? true : false} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              
              <ListItemButton sx={{ pl: 4 }}
                selected={selectedIndex === 5} 
                onClick={(event) => {
                  setGenerator(new TwoPointGenerator(new CircleDrawer()))
                  handleListItemClick(event, 5)
                }}
              >
                <ListItemIcon>
                  <PanoramaFishEyeIcon />
                </ListItemIcon>
                <ListItemText primary="Circle" />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }} 
                selected={selectedIndex === 6 }
                onClick={(event) => {
                  setGenerator(new TwoPointGenerator(new EllipseDrawer()))
                  handleListItemClick(event, 6)
                }}
              >
                <ListItemIcon>
                  <PanoramaFishEyeIcon />
                </ListItemIcon>
                <ListItemText primary="Ellipse" />
              </ListItemButton>
              
              <ListItemButton sx={{ pl: 4 }}
                selected={selectedIndex === 7}
                onClick={(event) => {
                  setGenerator(new TwoPointGenerator(new ParabolaDrawer()))
                  handleListItemClick(event, 7)
                }}
              >
                <ListItemIcon>
                  <PanoramaFishEyeIcon />
                </ListItemIcon>
                <ListItemText primary="Parabola" />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }} 
                selected={selectedIndex === 8}
                onClick={(event) => {
                  setGenerator(new TwoPointGenerator(new HyperbolaDrawer()))
                  handleListItemClick(event, 8)
                }}
              >
                <ListItemIcon>
                  <PanoramaFishEyeIcon />
                </ListItemIcon>
                <ListItemText primary="Hyperbola" />
              </ListItemButton>
            
            </List>
          </Collapse>

          <ListItemButton onClick={() => {handleCollapseClick("Curve")}}>
            <ListItemIcon>
              <DrawIcon />
            </ListItemIcon>
            <ListItemText primary="Curve Lines" />
              {open === "Curve" ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open === "Curve" ? true : false} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              
              <ListItemButton sx={{ pl: 4 }}
                selected={selectedIndex === 9} 
                onClick={(event) => {
                  setGenerator(new FourPointGenerator(new HermiteDrawer()))
                  handleListItemClick(event, 9)
                }}
              >
                <ListItemIcon>
                  <GestureIcon />
                </ListItemIcon>
                <ListItemText primary="Hermite" />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}
                selected={selectedIndex === 10} 
                onClick={(event) => {
                  setGenerator(new FourPointGenerator(new BezieDrawer()))
                  handleListItemClick(event, 10)
                }}
              >
                <ListItemIcon>
                  <GestureIcon />
                </ListItemIcon>
                <ListItemText primary="Bezie" />
              </ListItemButton>
              
              <ListItemButton sx={{ pl: 4 }}
                selected={selectedIndex === 11} 
                onClick={(event) => {
                  setGenerator(new MultiPointGeneratorImpl(new SpliteToFour(new BSplinesDrawer())))
                  handleListItemClick(event, 11)
                }}
              >
                <ListItemIcon>
                  <GestureIcon />
                </ListItemIcon>
                <ListItemText primary="B-Spline" />
              </ListItemButton>
            
            </List>
          </Collapse>
          
          <ListItemButton onClick={() => {handleCollapseClick("3D")}}>
            <ListItemIcon>
              <ThreeDRotationIcon/>
            </ListItemIcon>
            <ListItemText primary="3D" />
              {open === "3D" ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open === "3D" ? true : false} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              
              <ListItem key='Draw 3D' disablePadding>
                <ListItemButton 
                  selected={threeDRegime === true}
                  onClick={() => {
                    if (threeDRegime === true) {
                      closeThreeDRegime()
                    } else {
                      ThreeDObject(file)
                    }
                    handleThreeDRegimeClick()
                    }}>
                  <ListItemIcon>
                    <ViewInArIcon/>
                  </ListItemIcon>
                  <ListItemText primary='Draw 3D'/>
                </ListItemButton>
              </ListItem>

              <ListItem component="label" key='Upload obj' disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CloudUploadIcon />
                  </ListItemIcon>
                  <ListItemText primary='Upload Object'/>
                  <VisuallyHiddenInput type="file" accept='.obj' onChange={handleFileUpload} />
                </ListItemButton>
              </ListItem>
            
            </List>
          </Collapse>

          <ListItemButton onClick={() => {handleCollapseClick("Polygon")}}>
            <ListItemIcon>
              <PanoramaVerticalIcon/>
            </ListItemIcon>
            <ListItemText primary="Polygon" />
              {open === "MCH" ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open === "Polygon" ? true : false} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              
              <ListItem key='Polygon' disablePadding>
                <ListItemButton 
                  selected={selectedIndex === 13} 
                  onClick={(event) => {
                    setGenerator(new BasePolygonGenerator())
                    handleListItemClick(event, 13)
                  }}
                >
                  <ListItemIcon>
                    <PanoramaWideAngleIcon/>
                  </ListItemIcon>
                  <ListItemText primary='Polygon'/>
                </ListItemButton>
              </ListItem>
              
              <ListItem key='Graham Polygon' disablePadding>
                <ListItemButton 
                  selected={selectedIndex === 14} 
                  onClick={(event) => {
                    setGenerator(new PolygonGenerator(new GrahamMinimalConvexHullSolver()))
                    handleListItemClick(event, 14)
                  }}
                >
                  <ListItemIcon>
                    <PanoramaWideAngleIcon/>
                  </ListItemIcon>
                  <ListItemText primary='Graham Polygon'/>
                </ListItemButton>
              </ListItem>

              <ListItem key='Jarvis Polygon' disablePadding>
                <ListItemButton 
                  selected={selectedIndex === 15} 
                  onClick={(event) => {
                    setGenerator(new PolygonGenerator(new JarvisMinimalConvexHullSolver()))
                    handleListItemClick(event, 15)
                  }}
                >
                  <ListItemIcon>
                    <PanoramaWideAngleIcon/>
                  </ListItemIcon>
                  <ListItemText primary='Jarvis Polygon'/>
                </ListItemButton>
              </ListItem>
            
            </List>
          </Collapse>


          <ListItemButton onClick={() => {handleCollapseClick("Polygon Fillers")}}>
            <ListItemIcon>
              <FormatColorFillIcon/>
            </ListItemIcon>
            <ListItemText primary="Polygon Fillers" />
              {open === "MCH" ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open === "Polygon Fillers" ? true : false} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              
              <ListItem key='Raster Reamer' disablePadding>
                <ListItemButton 
                  selected={selectedIndex === 16} 
                  onClick={(event) => {
                    setGenerator(new FillPolygonGenerator(new RasterReamerFiller()))
                    handleListItemClick(event, 16)
                  }}
                >
                  <ListItemIcon>
                    <FormatPaintIcon/>
                  </ListItemIcon>
                  <ListItemText primary='Raster Reamer'/>
                </ListItemButton>
              </ListItem>

              <ListItem key='Simple Inoculum' disablePadding>
                <ListItemButton 
                  selected={selectedIndex === 17} 
                  onClick={(event) => {
                    setGenerator(new FillPolygonGenerator(new SimpleInoculumFiller()))
                    handleListItemClick(event, 17)
                  }}
                >
                  <ListItemIcon>
                    <FormatPaintIcon/>
                  </ListItemIcon>
                  <ListItemText primary='Simple Inoculum'/>
                </ListItemButton>
              </ListItem>

              <ListItem key='Line Inoculum' disablePadding>
                <ListItemButton 
                  selected={selectedIndex === 18} 
                  onClick={(event) => {
                    setGenerator(new FillPolygonGenerator(new LineInoculumFiller()))
                    handleListItemClick(event, 18)
                  }}
                >
                  <ListItemIcon>
                    <FormatPaintIcon/>
                  </ListItemIcon>
                  <ListItemText primary='Line Inoculum'/>
                </ListItemButton>
              </ListItem>

              <ListItem key='Raster Reamer Active edges' disablePadding>
                <ListItemButton 
                  selected={selectedIndex === 19} 
                  onClick={(event) => {
                    setGenerator(new FillPolygonGenerator(new RasterReamerActiveEdgeFiller()))
                    handleListItemClick(event, 19)
                  }}
                >
                  <ListItemIcon>
                    <FormatPaintIcon/>
                  </ListItemIcon>
                  <ListItemText primary='Raster Reamer Active edges'/>
                </ListItemButton>
              </ListItem>
              
            
            </List>
          </Collapse>

          
    
      </List>
             
      {/* <List className='items-center'>
        <Typography>Pixel Size</Typography>
        <Slider
          className='ml-5 w-[80%]'
          defaultValue={1}
          min={1}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={(event, value) => handleSlider(value)}
        />
        <Typography>Color Picker</Typography>
        <div>
          <input 
            type="color"
            className="ml-5 w-[80%]"
            onChange={(color) => setColor(color.target.value)}
          />
        </div>
      </List> */}
    </Box>
  );
  
  const container = window !== undefined ? () => window().document.body : undefined;
  
  function getMousePos(canvas: HTMLCanvasElement, evt: any) {
    var rect = canvas.getBoundingClientRect();

    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  function handleSlider(value: number | number[]) {
    const size = Array.isArray(value) ? value[0] : value;
    context.setPixelSize(size);
  }
  
  function closeThreeDRegime() {
    const canvasThreeD = document.getElementById("3Dcanvas")
    console.log(canvasThreeD)
    canvasThreeD?.remove()
  }

  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    if (canvas.getContext) {
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

      const clickListener = (evt: MouseEvent) => {
        const mousePos = getMousePos(canvas, evt)
        generator?.click(context, Math.floor(mousePos.x / context.pixelSize), Math.floor(mousePos.y / context.pixelSize))
      }

      const moveListener = (evt: MouseEvent) => {
        const mousePos = getMousePos(canvas, evt)
        generator?.move(context, Math.floor(mousePos.x / context.pixelSize), Math.floor(mousePos.y / context.pixelSize))
      }

      canvas.addEventListener('click', clickListener);
      canvas.addEventListener('mousemove', moveListener);

      canvas.addEventListener('mousedown', (evt) => {
        const mousePos = getMousePos(canvas, evt)
        generator?.press(context, Math.floor(mousePos.x / context.pixelSize), Math.floor(mousePos.y / context.pixelSize))  
      });

      canvas.addEventListener('mouseup', (evt) => {
        const mousePos = getMousePos(canvas, evt)
        generator?.release(context, Math.floor(mousePos.x / context.pixelSize), Math.floor(mousePos.y / context.pixelSize))  
      });
      
      document.addEventListener('keydown', (event) => {
        switch(event.code) {
          case 'KeyW': 
            context.addDebugPoint()
            context.repaint()
          break;
          case 'KeyS': 
            context.removeDebugPoint()
            context.repaint()
          break;
          case 'KeyE': 
            generator?.end(context)
          break;
        }
      });
    }
  }, [])

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
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
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
        <Box id='canvases' className="relative">
          <canvas id="canvas" width="1200" height="720" 
            className='absolute left-0 top-0 z-40 border'>
          </canvas>
          <canvas id="canvas2" width="1200" height="720" 
            className='absolute left-0 top-0 z-0 border'>
          </canvas>
        </Box>
      </Box>
    </Box>
  );
}