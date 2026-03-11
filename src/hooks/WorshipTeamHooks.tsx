import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { gql } from "../__generated__/gql";

/* ─── Worship Teams ─── */

const GetWorshipTeams = gql(`
  query GetWorshipTeams {
    getWorshipTeams {
      results {
        _id
        name
        description
        createdAt
        updatedAt
        author {
          _id
          firstName
          lastName
        }
        members {
          _id
          role
          skills
          user {
            _id
            firstName
            lastName
            email
          }
        }
      }
      errors {
        field
        message
      }
    }
  }
`);

const GetWorshipTeam = gql(`
  query GetWorshipTeam($id: String!) {
    getWorshipTeam(id: $id) {
      results {
        _id
        name
        description
        createdAt
        updatedAt
        author {
          _id
          firstName
          lastName
        }
        members {
          _id
          role
          skills
          user {
            _id
            firstName
            lastName
            email
          }
        }
      }
      errors {
        field
        message
      }
    }
  }
`);

const CreateWorshipTeam = gql(`
  mutation CreateWorshipTeam($options: WorshipTeamInput!) {
    createWorshipTeam(options: $options) {
      results {
        _id
        name
        description
      }
      errors {
        field
        message
      }
    }
  }
`);

const UpdateWorshipTeam = gql(`
  mutation UpdateWorshipTeam($id: String!, $options: WorshipTeamInput!) {
    updateWorshipTeam(id: $id, options: $options) {
      results {
        _id
        name
        description
      }
      errors {
        field
        message
      }
    }
  }
`);

const DeleteWorshipTeam = gql(`
  mutation DeleteWorshipTeam($id: String!) {
    deleteWorshipTeam(id: $id) {
      results {
        _id
      }
      errors {
        field
        message
      }
    }
  }
`);

/* ─── Team Members ─── */

const GetTeamMembers = gql(`
  query GetTeamMembers($teamId: String!) {
    getTeamMembers(teamId: $teamId) {
      results {
        _id
        role
        skills
        createdAt
        user {
          _id
          firstName
          lastName
          email
        }
        team {
          _id
          name
        }
      }
      errors {
        field
        message
      }
    }
  }
`);

const AddTeamMember = gql(`
  mutation AddTeamMember($options: TeamMemberInput!) {
    addTeamMember(options: $options) {
      results {
        _id
        role
        skills
        user {
          _id
          firstName
          lastName
          email
        }
      }
      errors {
        field
        message
      }
    }
  }
`);

const UpdateTeamMember = gql(`
  mutation UpdateTeamMember($id: String!, $options: UpdateTeamMemberInput!) {
    updateTeamMember(id: $id, options: $options) {
      results {
        _id
        role
        skills
      }
      errors {
        field
        message
      }
    }
  }
`);

const RemoveTeamMember = gql(`
  mutation RemoveTeamMember($id: String!) {
    removeTeamMember(id: $id) {
      results {
        _id
      }
      errors {
        field
        message
      }
    }
  }
`);

/* ─── Team Invites ─── */

const GetTeamInvites = gql(`
  query GetTeamInvites($teamId: String!) {
    getTeamInvites(teamId: $teamId) {
      results {
        _id
        email
        role
        status
        method
        inviteToken
        expiresAt
        createdAt
        skills
        invitedBy {
          _id
          firstName
          lastName
        }
        invitedUser {
          _id
          firstName
          lastName
          email
        }
        team {
          _id
          name
        }
      }
      errors {
        field
        message
      }
    }
  }
`);

const GetMyInvites = gql(`
  query GetMyInvites {
    getMyInvites {
      results {
        _id
        email
        role
        status
        method
        expiresAt
        createdAt
        skills
        invitedBy {
          _id
          firstName
          lastName
          email
          churchName
        }
        team {
          _id
          name
          description
        }
      }
      errors {
        field
        message
      }
    }
  }
`);

const SendTeamInvite = gql(`
  mutation SendTeamInvite($options: TeamInviteInput!) {
    sendTeamInvite(options: $options) {
      results {
        _id
        email
        role
        status
        method
        inviteToken
      }
      errors {
        field
        message
      }
    }
  }
`);

const RespondToInvite = gql(`
  mutation RespondToInvite($inviteId: String!, $accept: Boolean!) {
    respondToInvite(inviteId: $inviteId, accept: $accept) {
      results {
        _id
        status
      }
      errors {
        field
        message
      }
    }
  }
`);

const GetInviteByToken = gql(`
  query GetInviteByToken($token: String!) {
    getInviteByToken(token: $token) {
      results {
        _id
        role
        skills
        status
        expiresAt
        team {
          _id
          name
        }
        invitedBy {
          _id
          firstName
          lastName
        }
      }
      errors {
        field
        message
      }
    }
  }
`);

const AcceptInviteByToken = gql(`
  mutation AcceptInviteByToken($token: String!) {
    acceptInviteByToken(token: $token) {
      results {
        _id
        status
        team {
          _id
          name
        }
      }
      errors {
        field
        message
      }
    }
  }
`);

const CancelTeamInvite = gql(`
  mutation CancelTeamInvite($inviteId: String!) {
    cancelTeamInvite(inviteId: $inviteId) {
      results {
        _id
      }
      errors {
        field
        message
      }
    }
  }
`);

const ResendTeamInvite = gql(`
  mutation ResendTeamInvite($inviteId: String!) {
    resendTeamInvite(inviteId: $inviteId) {
      results {
        _id
        status
        expiresAt
      }
      errors {
        field
        message
      }
    }
  }
`);

/* ─── Hooks ─── */

// Teams
export const useGetWorshipTeams = () => {
  return useQuery(GetWorshipTeams);
};

export const useLazyGetWorshipTeams = () => {
  return useLazyQuery(GetWorshipTeams);
};

export const useGetWorshipTeam = (id: string) => {
  return useQuery(GetWorshipTeam, {
    variables: { id },
    skip: !id,
  });
};

export const useLazyGetWorshipTeam = () => {
  return useLazyQuery(GetWorshipTeam);
};

export const useCreateWorshipTeam = () => {
  return useMutation(CreateWorshipTeam, {
    refetchQueries: [{ query: GetWorshipTeams }],
  });
};

export const useUpdateWorshipTeam = () => {
  return useMutation(UpdateWorshipTeam, {
    refetchQueries: [{ query: GetWorshipTeams }],
  });
};

export const useDeleteWorshipTeam = () => {
  return useMutation(DeleteWorshipTeam, {
    refetchQueries: [{ query: GetWorshipTeams }],
  });
};

// Team Members
export const useGetTeamMembers = (teamId: string) => {
  return useQuery(GetTeamMembers, {
    variables: { teamId },
    skip: !teamId,
  });
};

export const useLazyGetTeamMembers = () => {
  return useLazyQuery(GetTeamMembers);
};

export const useAddTeamMember = () => {
  return useMutation(AddTeamMember);
};

export const useUpdateTeamMember = () => {
  return useMutation(UpdateTeamMember);
};

export const useRemoveTeamMember = () => {
  return useMutation(RemoveTeamMember);
};

// Team Invites
export const useGetTeamInvites = (teamId: string) => {
  return useQuery(GetTeamInvites, {
    variables: { teamId },
    skip: !teamId,
  });
};

export const useGetMyInvites = () => {
  return useQuery(GetMyInvites);
};

export const useGetInviteByToken = () => {
  return useLazyQuery(GetInviteByToken);
};

export const useSendTeamInvite = () => {
  return useMutation(SendTeamInvite);
};

export const useRespondToInvite = () => {
  return useMutation(RespondToInvite, {
    refetchQueries: [{ query: GetMyInvites }],
    // Evict all cached TeamInvite lists so any open TeamDetail page
    // immediately reflects the updated status without a manual refresh.
    update(cache) {
      cache.evict({ fieldName: "getTeamInvites" });
      cache.gc();
    },
  });
};

export const useAcceptInviteByToken = () => {
  return useMutation(AcceptInviteByToken, {
    // Same cache eviction — the invite status changed on the server,
    // so any cached getTeamInvites result is now stale.
    update(cache) {
      cache.evict({ fieldName: "getTeamInvites" });
      cache.gc();
    },
  });
};

export const useCancelTeamInvite = () => {
  return useMutation(CancelTeamInvite);
};

export const useResendTeamInvite = () => {
  return useMutation(ResendTeamInvite);
};
