# Azure_Hackathon
This project is intended to serve the Azure OpenAI Service - Hackathon for Students 2023 competition organized and sponsored by Sun*.

# Introduction
IJKL Team - Members/Student IDs (VNU-HCMUIT):
- Nguyen Ba Dai - 21521914
- Ho Tan Anh - 21521818
- Phan Ca Phat - 21520389
- Au Truong Giang - 21522019 

## Problem & Idea
### Problem
Students often face challenges in efficiently managing and synthesizing information from various sources during their research process. This can lead to time consuming and sometimes ineffective study practices. 

#### Feasibility
The solution involves a platform that consolidates research materials, facilitates quiz creation, and offers summarization features to simplify the research process, improve study efficiency, and enhance the overall learning experience for students. Feasibility is supported by available technology and the potential positive impact on academic performance.

### Idea
Main features:
Employ advanced semantic search for precision in document retrieval.
Automatically distill comprehensive document summaries for efficient understanding.
Generate insightful questions derived from the content of the documents.

#### Utility
The idea aims to offer significant benefits to students by providing a one-stop solution for research, study, and knowledge consolidation. It addresses common academic needs, simplifying processes such as research and exam preparation. The utility is strengthened by its alignment with the educational requirements and preferences of the target users.

#### Innovations
The idea merges different functions to meet students' academic needs uniquely. Unlike separate tools for research, quiz creation, and summarization, this innovation integrates these features into a single platform tailored for students. This consolidated approach provides a comprehensive solution, minimizing the use of multiple tools and enhancing the user experience in the digital learning landscape.

## Technical Solution
- Langchain: GPT API, Prompt, Chatbot.
+ Summary.
+ Question & Answer
+ Quizzes.

- Azure CosmosDB - MongoDB: Upload.
- Azure Static Wep App: Hosting Frontend
- Azure Container App: Hosting Backend

## Current Status Product
- Support seamless login and registration processes for users.
- Deliver rapid and highly accurate search results through advanced semantic search capabilities.
- Empower users to engage with documents through features such as summarization, content generation, quizzes, and real-time document-based chat.
- Implement state-of-the-art technologies like the RAG technique and Large Language Models (LLM) to enhance user experience and document processing.
- Backend hosted on Azure Container App, ensuring 24/7 availability and high reliability.
- Host the frontend on Azure Static Web App, ensuring a responsive and efficient user interface.
- Leverage Azure CosmosDB for robust database management and Azure AI Search for efficient search functionalities.

## Future Work
- Track and revisit discussions in the Q/A section, providing users with a dynamic and contextual learning experience.
- Offer tailored course suggestions based on users' majors, facilitating a more customized and efficient learning pathway.
- Provide access to a diverse range of publicly available resources, fostering knowledge sharing and community collaboration.
- Integrate a dedicated classroom mode for educators and students, enhancing collaboration through document sharing, real-time interaction, and discussion

## Related Document
- Tutorial — Flask Documentation (3.0.x) (https://flask.palletsprojects.com/en/3.0.x/tutorial/)
- Azure AI services documentation | Microsoft Learn (https://learn.microsoft.com/en-us/azure/ai-services/)
- API Reference - OpenAI API (https://platform.openai.com/docs/api-reference)
- Azure Cosmos DB for MongoDB documentation | Microsoft Learn (https://learn.microsoft.com/en-us/azure/cosmos-db/mongodb/)
️- 🔗 Langchain (https://python.langchain.com/docs/get_started/introduction)
- Angular - Understanding communicating with backend services using HTTP (https://angular.io/guide/understanding-communicating-with-http)
