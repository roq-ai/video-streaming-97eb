import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Administrator'];
  const roles = ['Content Provider', 'Moderator', 'Administrator'];
  const applicationName = `Video Streaming Platform Community `;
  const tenantName = `Provider`;
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Title: Administrator creates a Provider
As an Administrator,
I want to create a new Provider,
So that I can manage the streaming video content for my community.

Title: Administrator invites a Moderator
As an Administrator,
I want to invite a Moderator to my Provider,
So that they can help me manage the streaming video content.

Title: Administrator manages Content Providers
As an Administrator,
I want to manage the Content Providers associated with my Provider,
So that I can control who can upload and manage video content.

Title: Administrator sets premium content access
As an Administrator,
I want to set premium access for specific video content,
So that I can monetize the content and offer exclusive access to paying users.

Title: Moderator approves video content
As a Moderator,
I want to review and approve video content submitted by Content Providers,
So that I can ensure the content is appropriate for the community.

Title: Moderator manages Content Providers
As a Moderator,
I want to manage the Content Providers associated with the Provider I am moderating,
So that I can control who can upload and manage video content.

Title: Content Provider uploads video content
As a Content Provider,
I want to upload video content to the Provider,
So that I can share my content with the community.

Title: Content Provider edits video content
As a Content Provider,
I want to edit my uploaded video content,
So that I can make changes or updates as needed.

Title: Content Provider deletes video content
As a Content Provider,
I want to delete my uploaded video content,
So that I can remove it from the community if necessary.

Title: End User views video content
As an End User,
I want to view video content from the Provider,
So that I can enjoy and engage with the community's content.

Title: End User accesses premium content
As an End User,
I want to access premium video content by paying for it,
So that I can enjoy exclusive content and support the content creators.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="30px" bottom="20px" zIndex={3}>
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent w="50vw" h="70vh">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
