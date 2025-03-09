"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { imageToBase64 } from "./encode";
import { signInWithGoogle, logout } from "./authservice";
import { onAuthStateChanged } from "firebase/auth";
import { Moon, Sun } from "lucide-react";

export const handleSignOut = async (
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    await logout();
    setIsAuthenticated(false);
  } catch (error: any) {
    console.error("Error signing out:", error);
  }
};

export const handleSignIn = async (
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    await signInWithGoogle();
    setIsAuthenticated(true);
  } catch (error: any) {
    console.error("Error signing in:", error);
    alert("Sign-in failed: " + error.message);
  }
};

interface EcoPulseItem {
  id: string;
  Headline: string;
  Content: string;
  Image: string;
  Date: string;
}

const EcoPulse: React.FC = () => {
  const [items, setItems] = useState<EcoPulseItem[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [editHeadline, setEditHeadline] = useState<string>("");
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImageURL, setEditImageURL] = useState<string>("");
  const [newHeadline, setNewHeadline] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "EcoPulse"));
        const data = querySnapshot.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id,
            ...docData,
            Date: docData.Date?.toDate
              ? docData.Date.toDate()
              : new Date(docData.Date),
          };
        });

        data.sort((a, b) => b.Date.getTime() - a.Date.getTime());
        setItems(data as EcoPulseItem[]);
      } catch (error) {
        console.error("Error fetching pulse items:", error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleAddItem = async () => {
    if (!newHeadline || !newContent || !newImageFile) return;

    try {
      const imageUrl = await imageToBase64(newImageFile);

      const docRef = await addDoc(collection(db, "EcoPulse"), {
        Headline: newHeadline,
        Content: newContent,
        Image: imageUrl,
        Date: new Date().toISOString(),
      });

      setItems((prevItems) => [
        {
          id: docRef.id,
          Headline: newHeadline,
          Content: newContent,
          Image: imageUrl,
          Date: new Date().toISOString(),
        },
        ...prevItems,
      ]);

      setNewHeadline("");
      setNewContent("");
      setNewImageFile(null);
    } catch (error: any) {
      console.error("Error adding item:", error);
    }
  };

  const handleEdit = (
    id: string,
    Content: string,
    Headline: string,
    Image: string
  ) => {
    setEditing(id);
    setEditHeadline(Headline);
    setEditContent(Content);
    setEditImageURL(Image);
    setEditImageFile(null);
  };

  const saveEdit = async (id: string) => {
    try {
      let imageUrl = editImageURL;

      if (editImageFile) {
        imageUrl = await imageToBase64(editImageFile);
      }

      const itemRef = doc(db, "EcoPulse", id);
      await updateDoc(itemRef, {
        Headline: editHeadline,
        Content: editContent,
        Image: imageUrl,
      });

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? {
                ...item,
                Headline: editHeadline,
                Content: editContent,
                Image: imageUrl,
              }
            : item
        )
      );
      setEditing(null);
    } catch (error: any) {
      console.error("Error updating document:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "EcoPulse", id));
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error: any) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div className="transition-colors duration-300 min-h-screen p-6 bg-gradient-to-b from-green-50 to-blue-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <div className="mt-20 max-w-6xl mx-auto">
        {/* Header with Theme Toggle */}
        <div className="flex justify-center items-center mb-10">
          <h2 className="text-4xl font-bold ">
            <span className="text-green-500 dark:text-green-400">Eco</span>
            <span className="text-blue-500 dark:text-blue-400">Pulse</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="grid grid-cols-2 gap-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-lg p-6 shadow-md border-l-4 border-green-500 hover:shadow-xl transition-all duration-300 bg-gray-50 dark:bg-gray-700">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <img
                      src={item.Image}
                      alt={item.Headline}
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                  </div>

                  <div className="md:w-2/3">
                    {editing === item.id ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={editHeadline}
                          onChange={(e) => setEditHeadline(e.target.value)}
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white border-gray-300 text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        />
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full min-h-[100px] resize-y p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white border-gray-300 text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        />
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                          <input
                            type="file"
                            onChange={(e) =>
                              setEditImageFile(
                                e.target.files ? e.target.files[0] : null
                              )
                            }
                            className="w-full"
                          />
                        </div>
                        <div className="flex gap-4 mt-4">
                          <button
                            onClick={() => saveEdit(item.id)}
                            className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-full transition duration-300 ease-in-out hover:opacity-90">
                            Save
                          </button>
                          <button
                            onClick={() => setEditing(null)}
                            className="px-6 py-2 rounded-full transition duration-300 ease-in-out bg-gray-300 hover:bg-gray-400 text-gray-900 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h4 className="text-xl font-bold mb-3 text-blue-700 dark:text-blue-400">
                          {item.Headline}
                        </h4>
                        <p className="mb-4 text-gray-700 dark:text-gray-300">
                          {item.Content}
                        </p>
                        <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">
                          {new Date(item.Date).toLocaleDateString()}
                        </p>

                        {isAuthenticated && (
                          <div className="flex gap-3 mt-2">
                            <button
                              onClick={() =>
                                handleEdit(
                                  item.id,
                                  item.Content,
                                  item.Headline,
                                  item.Image
                                )
                              }
                              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm transition duration-300 ease-in-out hover:opacity-90">
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="bg-red-600 text-white px-4 py-2 rounded-full text-sm transition duration-300 ease-in-out hover:bg-red-700">
                              Delete
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {isAuthenticated && (
          <section className="mt-4 rounded-xl shadow-lg p-6 transition-colors bg-white dark:bg-gray-800 dark:border dark:border-gray-700">
            <h3 className="text-2xl mb-6 font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent dark:text-gradient-dark inline-block">
              Add New Update
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Headline"
                value={newHeadline}
                onChange={(e) => setNewHeadline(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white border-gray-300 text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              />
              <textarea
                placeholder="Content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[100px] bg-white border-gray-300 text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              />

              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:border dark:border-gray-600">
                <input
                  type="file"
                  onChange={(e) =>
                    setNewImageFile(e.target.files ? e.target.files[0] : null)
                  }
                  className="w-full"
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleAddItem}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-full transition duration-300 ease-in-out hover:opacity-90">
                  Add Pulse
                </button>
                <button
                  onClick={() => handleSignOut(setIsAuthenticated)}
                  className="bg-red-600 text-white px-6 py-2 rounded-full transition duration-300 ease-in-out hover:bg-red-700">
                  Sign Out
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default EcoPulse;
