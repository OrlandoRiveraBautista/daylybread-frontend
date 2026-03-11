import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { gql } from "../__generated__/gql";

const GetWorshipServices = gql(`
  query GetWorshipServices($teamId: String) {
    getWorshipServices(teamId: $teamId) {
      results {
        _id
        name
        date
        notes
        status
        createdAt
        updatedAt
        author {
          _id
          firstName
          lastName
        }
        team {
          _id
          name
        }
        assignments {
          _id
          role
          status
          notes
          member {
            _id
            role
            user {
              _id
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
        _id
        name
        date
        notes
        status
        createdAt
        updatedAt
        author {
          _id
          firstName
          lastName
        }
        team {
          _id
          name
        }
        assignments {
          _id
          role
          status
          notes
          member {
            _id
            role
            user {
              _id
              firstName
              lastName
            }
          }
        }
        setlist {
          _id
          name
          items {
            _id
            order
            key
            bpm
            notes
            song {
              _id
              title
              artist
              defaultKey
              bpm
              lyrics
              chordChart
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
        _id
        name
        date
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

const UpdateWorshipService = gql(`
  mutation UpdateWorshipService($id: String!, $options: WorshipServiceInput!) {
    updateWorshipService(id: $id, options: $options) {
      results {
        _id
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
        _id
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
        _id
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
        _id
        role
        status
        member {
          _id
          user {
            _id
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

const RemoveServiceAssignment = gql(`
  mutation RemoveServiceAssignment($id: String!) {
    removeServiceAssignment(id: $id) {
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

/* ─── Setlists ─── */

const GetSetlist = gql(`
  query GetSetlist($serviceId: String!) {
    getSetlist(serviceId: $serviceId) {
      results {
        _id
        name
        items {
          _id
          order
          key
          bpm
          notes
          song {
            _id
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
        _id
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
        _id
        order
        key
        bpm
        notes
        song {
          _id
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
        _id
        order
        key
        bpm
        notes
        song {
          _id
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
        _id
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
        _id
        items {
          _id
          order
          song {
            _id
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
        _id
        date
        notes
        songIds
        createdAt
        team {
          _id
          name
        }
        service {
          _id
          name
          date
        }
        author {
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

const CreateRehearsal = gql(`
  mutation CreateRehearsal($options: RehearsalInput!) {
    createRehearsal(options: $options) {
      results {
        _id
        date
        notes
        songIds
        team {
          _id
          name
        }
        service {
          _id
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
        _id
        date
        notes
        songIds
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
        _id
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
