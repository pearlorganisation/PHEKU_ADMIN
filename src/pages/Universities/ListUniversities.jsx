import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUniversities } from '../../features/actions/universityAction';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import parse from "html-react-parser";

const ListUniversities = () => {
  
  const dispatch = useDispatch();
  const { universityInfo } = useSelector((state) => state.universities)
  
  useEffect(()=>{
    dispatch(getAllUniversities())
  },[])

  const renderHighlights = (highlights) => {
  
    // Remove all HTML tags and newline characters
    const cleanHighlights =highlights ? highlights
      .replace(/<\/?[^>]+(>|$)/g, '') // Removes all HTML tags
      .replace(/\\n/g, ''):""; // Removes escaped newlines

    // Split highlights into a list by a delimiter (e.g., commas, newlines, etc.)
    const highlightList = cleanHighlights.split('.').filter((item) => item.trim() !== '');

    // Render the list
    return highlightList.map((highlight, index) => (
      <Typography key={index} variant="body2" color="textSecondary" component="li">
        • {highlight.trim()}
      </Typography>
    ));
  };

  const renderFacilities = (facilities) => {
    return facilities ? facilities
      .replace(/<\/?[^>]+(>|$)/g, '') // Remove all HTML tags
      .split(/\\n/g) // Split by escaped newlines
      .filter((facility) => facility.trim()) // Remove empty entries
      .map((facility, index) => (
        <Typography key={index} variant="body2" color="textSecondary" component="li">
          • {facility.trim()}
        </Typography>
      )):"";
  };

  return (
    <main className="flex-1 p-8 mt-16 ml-64">
      <Grid container spacing={4} sx={{ padding: 3 }}>
        {Array.isArray(universityInfo) && universityInfo?.map((university) => (
          <Grid item xs={12} key={university._id}>
            <Card
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.02)'
                }
              }}
            >
              {/* Cover Photo */}
              <CardMedia
                component="img"
                height="200"
                image={university?.coverPhoto?.secure_url}
                alt={`${university.name} cover`}
                sx={{
                  height: 200,
                  position: 'relative',
                  '& img': {
                    objectFit: 'cover'
                  }
                }}
              />

              {/* Logo */}
              <CardMedia
                component="img"
                image={university?.logo?.secure_url}
                alt={`${university?.name} logo`}
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  border: '4px solid white',
                  position: 'relative',
                  top: 10,
                  left: 20,
                  zIndex: 10
                }}
              />

              {/* University Details */}
              <CardContent sx={{ paddingTop: 6 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {university?.name}
                </Typography>

                {/* Expandable Sections */}
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="overview-content"
                  >
                    <Typography>Overview</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                          <LocationOnIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                          {university?.address}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                          <CalendarTodayIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                          Est. {university?.estdYear}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                          <PhoneIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                          {university?.phone}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                          <LanguageIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                          <a
                            href={university?.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Website
                          </a>
                        </Typography>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="highlights-content"
                  >
                    <Typography>Highlights</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      component="ul"
                      sx={{
                        listStyleType: 'none',
                        padding: 0,
                        margin: 0
                      }}
                    >
                      {renderHighlights(university?.highlights)}
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="rankings-content"
                  >
                    <Typography>Rankings</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Chip
                          label={`Global Rank: ${university?.ranking?.global}`}
                          color="primary"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item>
                        <Chip
                          label={`National Rank: ${university?.ranking?.national}`}
                          color="secondary"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="facilities-content"
                  >
                    <Typography>Facilities</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      component="ul"
                      sx={{
                        listStyleType: 'none',
                        padding: 0,
                        margin: 0
                      }}
                    >
                      {renderFacilities(university?.facilities)}
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                {/** Faculties Section */}
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="faculties"
                  >
                    <Typography>Faculties</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      {university?.faculties?.map((faculty) => (
                        <Grid item xs={12} key={faculty._id}>
                          <Card variant="outlined" sx={{ padding: 2 }}>
                            <Typography variant="h6" gutterBottom>
                              {faculty.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              <strong>Position:</strong> {faculty?.position}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              <strong>Department:</strong> {faculty?.department}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              <strong>Contact:</strong> {faculty?.contactEmail}
                            </Typography>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </main>
  );
}

export default ListUniversities