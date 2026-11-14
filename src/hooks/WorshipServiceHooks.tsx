import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { gql } from "../__generated__/gql";

const GetWorshipServices = gql(`
  query GetWorshipServices($teamId: String) {
    getWorshipServices(teamId: $teamId) {
      results {
        id
        name
        date
        notes
        status
        createdAt
        updatedAt
        author {
          id
          firstName
          lastName
        }
        team {
          id
          name
        }
        assignments {
          id
          role
          status
          notes
          member {
            id
            role
            user {
              id
              firstName
              lastName
            }
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

const GetWorshipService = gql(`
  query GetWorshipService($id: String!) {
    getWorshipService(id: $id) {
      results {
        id
        name
        date
        notes
        status
        createdAt
        updatedAt
        author {
          id
          firstName
          lastName
        }
        team {
          id
          name
        }
        assignments {
          id
          role
          status
          notes
          member {
            id
            role
            user {
              id
              firstName
              lastName
            }
          }
        }
        setlist {
          id
          name
          items {
            id
            order
            key
            bpm
            notes
            song {
              id
              title
              artist
              defaultKey
              bpm
              lyrics
              chordChart
              youtubeLink
            }
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

const CreateWorshipService = gql(`
  mutation CreateWorshipService($options: WorshipServiceInput!) {
    createWorshipService(options: $options) {
      results {
        id
        name
        date
        status
        team {
          id
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

const UpdateWorshipService = gql(`
  mutation UpdateWorshipService($id: String!, $options: WorshipServiceInput!) {
    updateWorshipService(id: $id, options: $options) {
      results {
        id
        name
        date
        status
      }
      errors {
        field
        message
      }
    }
  }
`);

const DeleteWorshipService = gql(`
  mutation DeleteWorshipService($id: String!) {
    deleteWorshipService(id: $id) {
      results {
        id
      }
      errors {
        field
        message
      }
    }
  }
`);

const PublishWorshipService = gql(`
  mutation PublishWorshipService($id: String!) {
    publishWorshipService(id: $id) {
      results {
        id
        name
        status
      }
      errors {
        field
        message
      }
    }
  }
`);

/* ─── Service Assignments ─── */

const CreateServiceAssignment = gql(`
  mutation CreateServiceAssignment($options: ServiceAssignmentInput!) {
    createServiceAssignment(options: $options) {
      results {
        id
        role
        status
        member {
          id
          user {
            id
            firstName
            lastName
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

const RespondToAssignment = gql(`
  mutation RespondToAssignment($assignmentId: String!, $accept: Boolean!) {
    respondToAssignment(assignmentId: $assignmentId, accept: $accept) {
      results {
        id
        status
      }
      errors {
        field
        message
      }
    }
  }
`);

const RemoveServiceAssignment = gql(`
  mutation RemoveServiceAssignment($id: String!) {
    removeServiceAssignment(id: $id) {
      results {
        id
      }
      errors {
        field
        message
      }
    }
  }
`);

/* ─── Setlists ─── */

const GetSetlist = gql(`
  query GetSetlist($serviceId: String!) {
    getSetlist(serviceId: $serviceId) {
      results {
        id
        name
        items {
          id
          order
          key
          bpm
          notes
          song {
            id
            title
            artist
            defaultKey
            bpm
            lyrics
            chordChart
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

const CreateSetlist = gql(`
  mutation CreateSetlist($options: SetlistInput!) {
    createSetlist(options: $options) {
      results {
        id
        name
      }
      errors {
        field
        message
      }
    }
  }
`);

const AddSetlistItem = gql(`
  mutation AddSetlistItem($setlistId: String!, $options: SetlistItemInput!) {
    addSetlistItem(setlistId: $setlistId, options: $options) {
      results {
        id
        order
        key
        bpm
        notes
        song {
          id
          title
          artist
        }
      }
      errors {
        field
        message
      }
    }
  }
`);

const UpdateSetlistItem = gql(`
  mutation UpdateSetlistItem($id: String!, $options: SetlistItemInput!) {
    updateSetlistItem(id: $id, options: $options) {
      results {
        id
        order
        key
        bpm
        notes
        song {
          id
          title
          artist
        }
      }
      errors {
        field
        message
      }
    }
  }
`);

const RemoveSetlistItem = gql(`
  mutation RemoveSetlistItem($id: String!) {
    removeSetlistItem(id: $id) {
      results {
        id
      }
      errors {
        field
        message
      }
    }
  }
`);

const ReorderSetlistItems = gql(`
  mutation ReorderSetlistItems($setlistId: String!, $itemIds: [String!]!) {
    reorderSetlistItems(setlistId: $setlistId, itemIds: $itemIds) {
      results {
        id
        items {
          id
          order
          song {
            id
            title
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

/* ─── Rehearsals ─── */

const GetRehearsals = gql(`
  query GetRehearsals($teamId: String, $serviceId: String) {
    getRehearsals(teamId: $teamId, serviceId: $serviceId) {
      results {
        id
        date
        notes
        rehearsalSongs {
          id
          order
          song {
            id
            title
          }
        }
        createdAt
        team {
          id
          name
        }
        service {
          id
          name
          date
        }
        author {
          id
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

const CreateRehearsal = gql(`
  mutation CreateRehearsal($options: RehearsalInput!) {
    createRehearsal(options: $options) {
      results {
        id
        date
        notes
        rehearsalSongs {
          id
          order
          song {
            id
            title
          }
        }
        team {
          id
          name
        }
        service {
          id
          name
          date
        }
      }
      errors {
        field
        message
      }
    }
  }
`);

const UpdateRehearsal = gql(`
  mutation UpdateRehearsal($id: String!, $options: RehearsalInput!) {
    updateRehearsal(id: $id, options: $options) {
      results {
        id
        date
        notes
        rehearsalSongs {
          id
          order
          song {
            id
            title
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

const DeleteRehearsal = gql(`
  mutation DeleteRehearsal($id: String!) {
    deleteRehearsal(id: $id) {
      results {
        id
      }
      errors {
        field
        message
      }
    }
  }
`);

/* ─── Hooks ─── */

// Services
export const useGetWorshipServices = (teamId?: string) => {
  return useQuery(GetWorshipServices, {
    variables: { teamId },
  });
};

export const useLazyGetWorshipServices = () => {
  return useLazyQuery(GetWorshipServices);
};

export const useGetWorshipService = (id: string) => {
  return useQuery(GetWorshipService, {
    variables: { id },
    skip: !id,
  });
};

export const useLazyGetWorshipService = () => {
  return useLazyQuery(GetWorshipService);
};

export const useCreateWorshipService = () => {
  return useMutation(CreateWorshipService, {
    refetchQueries: [{ query: GetWorshipServices }],
  });
};

export const useUpdateWorshipService = () => {
  return useMutation(UpdateWorshipService, {
    refetchQueries: [{ query: GetWorshipServices }],
  });
};

export const useDeleteWorshipService = () => {
  return useMutation(DeleteWorshipService, {
    refetchQueries: [{ query: GetWorshipServices }],
  });
};

export const usePublishWorshipService = () => {
  return useMutation(PublishWorshipService, {
    refetchQueries: [{ query: GetWorshipServices }],
  });
};

// Assignments
export const useCreateServiceAssignment = () => {
  return useMutation(CreateServiceAssignment);
};

export const useRespondToAssignment = () => {
  return useMutation(RespondToAssignment);
};

export const useRemoveServiceAssignment = () => {
  return useMutation(RemoveServiceAssignment);
};

// Setlists
export const useGetSetlist = (serviceId: string) => {
  return useQuery(GetSetlist, {
    variables: { serviceId },
    skip: !serviceId,
  });
};

export const useLazyGetSetlist = () => {
  return useLazyQuery(GetSetlist);
};

export const useCreateSetlist = () => {
  return useMutation(CreateSetlist);
};

export const useAddSetlistItem = () => {
  return useMutation(AddSetlistItem);
};

export const useUpdateSetlistItem = () => {
  return useMutation(UpdateSetlistItem);
};

export const useRemoveSetlistItem = () => {
  return useMutation(RemoveSetlistItem);
};

export const useReorderSetlistItems = () => {
  return useMutation(ReorderSetlistItems);
};

// Rehearsals
export const useGetRehearsals = (teamId?: string, serviceId?: string) => {
  return useQuery(GetRehearsals, {
    variables: { teamId, serviceId },
  });
};

export const useLazyGetRehearsals = () => {
  return useLazyQuery(GetRehearsals);
};

export const useCreateRehearsal = () => {
  return useMutation(CreateRehearsal, {
    refetchQueries: [{ query: GetRehearsals }],
  });
};

export const useUpdateRehearsal = () => {
  return useMutation(UpdateRehearsal, {
    refetchQueries: [{ query: GetRehearsals }],
  });
};

export const useDeleteRehearsal = () => {
  return useMutation(DeleteRehearsal, {
    refetchQueries: [{ query: GetRehearsals }],
  });
};
