
import React, { useState } from "react";
import styled from "styled-components";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const Card = styled.div`
  width: 330px;
  height: 490px;
  background-color: ${({ theme }) => theme.card};
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 26px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.5s ease-in-out;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 50px 4px rgba(0, 0, 0, 0.6);
    filter: brightness(1.1);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 180px;
  position: relative;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease-in-out;
  transform: ${({ index }) => `translateX(-${index * 100}%)`};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.3);
  flex-shrink: 0;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  display: ${({ show }) => (show ? "block" : "none")};

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: 5px;
`;

const RightArrow = styled(ArrowButton)`
  right: 5px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`;

const Tag = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primary + 15};
  padding: 2px 8px;
  border-radius: 10px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
`;

const Date = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 80};
`;

const Description = styled.div`
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 99};
  margin-top: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ProjectCards = ({ project, setOpenModal }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = project.images || [];

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Card onClick={() => setOpenModal({ state: true, project })}>
      <ImageContainer>
        <ImageWrapper index={currentImageIndex}>
          {images.map((img, index) => (
            <Image key={index} src={img} />
          ))}
        </ImageWrapper>
        {images.length > 1 && (
          <>
            <LeftArrow show={images.length > 1} onClick={handlePrevImage}>
              <ArrowBackIos fontSize="small" />
            </LeftArrow>
            <RightArrow show={images.length > 1} onClick={handleNextImage}>
              <ArrowForwardIos fontSize="small" />
            </RightArrow>
          </>
        )}
      </ImageContainer>
      <Tags>
        {project.tags?.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </Tags>
      <Details>
        <Title>{project.title}</Title>
        <Date>{project.date}</Date>
        <Description>{project.description}</Description>
      </Details>
    </Card>
  );
};

export default ProjectCards;
