# Azure Hackathon Product

## Introduction
**IJKL Team - VNU-HCMUIT**  
| Student ID | Full Name        | Role                              |
|------------|------------------|-----------------------------------|
| 21521914   | Dai Nguyen Ba    | Team Lead, Backend Developer, AI Developer |
| 21521818   | Anh Ho Tan       | Frontend Developer, UX/UI Designer |
| 21520389   | Phat Phan Ca     | Backend Developer, Tester         |
| 21522019   | Giang Au Truong  | Frontend Developer, Tester, Business Analyst |
| 21521846   | Bang Huynh Hai   | Backend Developer                 |

## Problem & Idea

### Problem
Students often face difficulties in efficiently managing and synthesizing information from diverse sources during their research process. This can lead to time-consuming and sometimes ineffective study practices.

#### Feasibility
The proposed solution is a platform that consolidates research materials, facilitates quiz creation, and offers summarization features. It aims to streamline the research process, improve study efficiency, and enhance the overall learning experience for students. The solution is technically feasible with current technologies and has high potential to positively impact academic performance.

### Idea

**Main Features**:
- Employ advanced semantic search for precise document retrieval.
- Automatically generate concise and informative document summaries.
- Create insightful questions derived directly from document content.

#### Utility
This idea offers significant benefits to students by providing a one-stop solution for research, study, and knowledge consolidation. It simplifies common academic processes such as document review and exam preparation. Its utility is further enhanced by aligning closely with the educational needs and preferences of its target users.

#### Innovations
The solution uniquely integrates features typically handled by separate tools—research, summarization, and quiz generation—into a single platform tailored for students. This consolidated approach minimizes the need for multiple tools and improves user experience in the digital learning environment.

## Technical Solution

- **Langchain**: GPT API, Prompt Engineering, Chatbot
  - Summarization
  - Question & Answer
  - Quiz Generation
- **Azure Cosmos DB (MongoDB API)**: Document upload and storage
- **Azure Static Web Apps**: Frontend hosting
- **Azure Container Apps**: Backend hosting

## Current Product Status

- Supports seamless user login and registration.
- Delivers fast and accurate search results using advanced semantic search.
- Enables interaction with documents via summarization, content generation, quizzes, and real-time Q&A.
- Implements state-of-the-art techniques such as Retrieval-Augmented Generation (RAG) and Large Language Models (LLMs).
- Backend hosted on Azure Container Apps, ensuring 24/7 availability and high reliability.
- Frontend hosted on Azure Static Web Apps, providing a responsive and efficient user interface.
- Utilizes Azure Cosmos DB for robust database management and Azure AI Search for advanced search functionality.

## Future Work

- Allow users to track and revisit discussions in the Q&A section for a dynamic and contextual learning experience.
- Provide course suggestions tailored to users' majors, promoting personalized learning pathways.
- Offer access to a wide range of public resources to encourage knowledge sharing and collaboration.
- Introduce a dedicated classroom mode for educators and students to enhance collaboration via shared documents, real-time interaction, and discussions.

## Related Documents

- [Flask Tutorial — Flask Documentation (3.0.x)](https://flask.palletsprojects.com/en/3.0.x/tutorial/)
- [Azure AI Services Documentation | Microsoft Learn](https://learn.microsoft.com/en-us/azure/ai-services/)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Azure Cosmos DB for MongoDB Documentation | Microsoft Learn](https://learn.microsoft.com/en-us/azure/cosmos-db/mongodb/)
- [LangChain Documentation](https://python.langchain.com/docs/get_started/introduction)
- [Angular: Communicating with Backend Services Using HTTP](https://angular.io/guide/understanding-communicating-with-http)
