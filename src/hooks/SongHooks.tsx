import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { gql } from "../__generated__/gql";

const GetSongs = gql(`
  query GetSongs {
    getSongs {
      results {
        _id
        title
        artist
        defaultKey
        bpm
        lyrics
        chordChart
        youtubeLink
        notes
        createdAt
        updatedAt
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

const GetSong = gql(`
  query GetSong($id: String!) {
    getSong(id: $id) {
      results {
        _id
        title
        artist
        defaultKey
        bpm
        lyrics
        chordChart
        youtubeLink
        notes
        createdAt
        updatedAt
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

const SearchSongs = gql(`
  query SearchSongs($searchTerm: String!) {
    searchSongs(searchTerm: $searchTerm) {
      results {
        _id
        title
        artist
        defaultKey
        bpm
        lyrics
        chordChart
        youtubeLink
        notes
        createdAt
        updatedAt
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

const CreateSong = gql(`
  mutation CreateSong($options: SongInput!) {
    createSong(options: $options) {
      results {
        _id
        title
        artist
        defaultKey
        bpm
        lyrics
        chordChart
        youtubeLink
        notes
        createdAt
        updatedAt
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

const UpdateSong = gql(`
  mutation UpdateSong($id: String!, $options: SongInput!) {
    updateSong(id: $id, options: $options) {
      results {
        _id
        title
        artist
        defaultKey
        bpm
        lyrics
        chordChart
        youtubeLink
        notes
        createdAt
        updatedAt
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

const DeleteSong = gql(`
  mutation DeleteSong($id: String!) {
    deleteSong(id: $id) {
      results {
        _id
        title
      }
      errors {
        field
        message
      }
    }
  }
`);

/* ─── Hooks ─── */

export const useGetSongs = () => {
  return useQuery(GetSongs);
};

export const useLazyGetSongs = () => {
  return useLazyQuery(GetSongs);
};

export const useGetSong = (id: string) => {
  return useQuery(GetSong, {
    variables: { id },
    skip: !id,
  });
};

export const useLazyGetSong = () => {
  return useLazyQuery(GetSong);
};

export const useSearchSongs = () => {
  return useLazyQuery(SearchSongs);
};

export const useCreateSong = () => {
  return useMutation(CreateSong, {
    refetchQueries: [{ query: GetSongs }],
  });
};

export const useUpdateSong = () => {
  return useMutation(UpdateSong, {
    refetchQueries: [{ query: GetSongs }],
  });
};

export const useDeleteSong = () => {
  return useMutation(DeleteSong, {
    refetchQueries: [{ query: GetSongs }],
  });
};
