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
import { onAuthStateChanged } from "firebase/auth";
import { imageToBase64 } from "./encode";
import { signInWithGoogle, logout } from "./authservice";

const handleSignOut = async (
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

interface NewsItem {
  id: string;
  Headline: string;
  Content: string;
  Image: string;
  News: boolean;
  Date: string;
}

const EcoPulse: React.FC = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [editHeadline, setEditHeadline] = useState<string>("");
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImageURL, setEditImageURL] = useState<string>("");
  const [newHeadline, setNewHeadline] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newNews, setNewNews] = useState<boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "News"));
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

        // Sort by descending date
        data.sort((a, b) => b.Date.getTime() - a.Date.getTime());
        setItems(data as NewsItem[]);
      } catch (error) {
        console.error("Error fetching news items:", error);
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

      const docRef = await addDoc(collection(db, "News"), {
        Headline: newHeadline,
        Content: newContent,
        Image: imageUrl,
        News: newNews,
        Date: new Date().toISOString(),
      });

      setItems((prevItems) => [
        {
          id: docRef.id,
          Headline: newHeadline,
          Content: newContent,
          Image: imageUrl,
          News: newNews,
          Date: new Date().toISOString(),
        },
        ...prevItems,
      ]);

      setNewHeadline("");
      setNewContent("");
      setNewImageFile(null);
      setNewNews(true);
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

      const itemRef = doc(db, "News", id);
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
      await deleteDoc(doc(db, "News", id));
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error: any) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-blue-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* EcoPulse Header */}
        <h2 className="text-4xl font-bold text-center mb-10">
          <span className="text-green-600">Eco</span>
          <span className="text-blue-600">Pulse</span>
        </h2>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8">
          {/* News & Events Items */}
          <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-3xl mb-6 font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent inline-block">
              Latest Updates
            </h3>

            <div className="grid gap-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-lg p-6 shadow-md border-l-4 border-green-500 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
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
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full min-h-[100px] resize-y p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                          <input
                            type="file"
                            onChange={(e) =>
                              setEditImageFile(
                                e.target.files ? e.target.files[0] : null
                              )
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                          <div className="flex gap-4 mt-4">
                            <button
                              onClick={() => saveEdit(item.id)}
                              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-full transition duration-300 ease-in-out hover:opacity-90">
                              Save
                            </button>
                            <button
                              onClick={() => setEditing(null)}
                              className="bg-gray-300 text-gray-900 px-6 py-2 rounded-full transition duration-300 ease-in-out hover:bg-gray-400">
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h4 className="text-xl font-bold mb-3 text-blue-700">
                            {item.Headline}
                          </h4>
                          <p className="text-gray-700 mb-4">{item.Content}</p>
                          <p className="text-sm text-gray-500 mb-4">
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
          </section>

          {/* Admin Section */}
          {isAuthenticated && (
            <section className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl mb-6 font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent inline-block">
                Add New Update
              </h3>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Headline"
                  value={newHeadline}
                  onChange={(e) => setNewHeadline(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <textarea
                  placeholder="Content"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[100px]"
                />
                <div>
                  <label className="flex items-center space-x-2 mb-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newNews}
                      onChange={(e) => setNewNews(e.target.checked)}
                      className="form-checkbox h-5 w-5 text-green-600 rounded focus:ring-green-500"
                    />
                    <span className="text-gray-700">Mark as News</span>
                  </label>
                </div>
                <input
                  type="file"
                  onChange={(e) =>
                    setNewImageFile(e.target.files ? e.target.files[0] : null)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <div className="flex gap-4">
                  <button
                    onClick={handleAddItem}
                    className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-full transition duration-300 ease-in-out hover:opacity-90">
                    Add Update
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
    </div>
  );
};

export default EcoPulse;
